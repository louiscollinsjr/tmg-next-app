import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import Review from "@/lib/models/Review";
import Project from "@/lib/models/Project";
import ServiceCategory from '@/lib/models/ServiceCategory';
import { LeanUser, ProjectWithImages, ProfessionalsData } from '@/types/professional';

export async function getProfessionals(): Promise<ProfessionalsData> {
  try {
    await dbConnect();
    console.log('Connected to database, fetching professionals...');
    
    // Get all service categories
    const allCategories = await ServiceCategory.find().select('slug name').lean();
    console.log('Found categories:', allCategories.length);

    const categories = allCategories.map(cat => ({
      slug: cat.slug,
      name: cat.name
    }));

    // First get all professionals
    const professionals = await User.find({ 
      isPro: true,
      status: 'active'
    }).select({
      name: 1,
      image: 1,
      businessInfo: 1,
      status: 1,
      isFavorite: 1,
      selectedServices: 1,
      createdAt: 1
    }).lean<LeanUser[]>();

    if (professionals.length === 0) {
      console.log('No professionals found. Database query returned empty array.');
      return { professionals: [], categories };
    }

    // Get all unique category slugs from all professionals
    const allCategorySlugs = [...new Set(
      professionals.flatMap(pro => 
        pro.selectedServices?.map(service => service.categoryId) || []
      )
    )];

    // Fetch all relevant service categories
    const serviceCategories = await ServiceCategory.find({
      slug: { $in: allCategorySlugs }
    }).lean();

    // Create a map of category slugs to names
    const categoryNameMap = new Map(
      serviceCategories.map(cat => [cat.slug, cat.name])
    );

    // Get all reviews for these professionals
    const professionalIds = professionals.map(pro => pro._id);
    
    // Fetch projects and their images for each professional
    const projects = await Project.find({
      contractor: { $in: professionalIds },
      status: { $in: ['completed', 'in_progress'] }
    })
    .select('contractor images')
    .lean<ProjectWithImages[]>();

    // Create a map of professional project images
    const projectImagesMap = new Map<string, string[]>();
    projects.forEach(project => {
      const contractorId = project.contractor.toString();
      const projectImages = project.images.map(img => img.url).slice(0, 4); // Get up to 4 images
      
      if (!projectImagesMap.has(contractorId)) {
        projectImagesMap.set(contractorId, projectImages);
      } else {
        const existingImages = projectImagesMap.get(contractorId) || [];
        projectImagesMap.set(
          contractorId, 
          [...existingImages, ...projectImages].slice(0, 4)
        );
      }
    });

    // Get reviews data 
    const reviews = await Review.aggregate([
      {
        $match: {
          contractor: { $in: professionalIds },
          status: 'published'
        }
      },
      {
        $group: {
          _id: '$contractor',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 }
        }
      }
    ]);

    // Create a map of professional ratings
    const ratingsMap = new Map(
      reviews.map(review => [review._id.toString(), {
        rating: Math.round(review.averageRating * 10) / 10,
        count: review.reviewCount
      }])
    );

    const displayProfessionals = professionals.map(pro => {
      const proRating = ratingsMap.get(pro._id.toString());
      const projectImages = projectImagesMap.get(pro._id.toString()) || [];
      
      const projectImageUrls = projectImages
        .filter(img => img && typeof img === 'string' && img.trim() !== '')
        .slice(0, 4);
      
      const images: string[] = [];
      
      if (pro.image && typeof pro.image === 'string' && pro.image.trim() !== '') {
        images.push(pro.image);
      }
      
      images.push(...projectImageUrls);
      
      const serializedServices = pro.selectedServices?.map(service => ({
        categoryId: service.categoryId,
        optionId: service.optionId
      })) || [];
      const uniqueCategories = [...new Set(serializedServices.map(service => service.categoryId))];
      const firstCategory = uniqueCategories[0] || '';
      const additionalCategories = uniqueCategories.length > 1 ? uniqueCategories.length - 1 : 0;
      
      const categoryName = categoryNameMap.get(firstCategory) || '';
      const specialty = categoryName + (additionalCategories > 0 ? ` (+${additionalCategories})` : '');
      
      return {
        id: pro._id.toString(),
        name: pro.name,
        businessName: pro.businessInfo?.companyName || pro.name,
        images,
        rating: proRating?.rating || 0,
        reviewCount: proRating?.count || 0,
        specialty,
        location: pro.businessInfo?.serviceArea?.[0] || '',
        isFavorite: pro.isFavorite || false,
        selectedServices: serializedServices,
        createdAt: pro.createdAt?.toISOString() || new Date().toISOString()
      };
    });

    return {
      professionals: displayProfessionals,
      categories
    };
  } catch (error) {
    console.error('Error fetching professionals:', error);
    return {
      professionals: [],
      categories: []
    };
  }
}
