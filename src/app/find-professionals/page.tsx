import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClientProfessionals from "@/components/ClientProfessionals";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import Review from "@/lib/models/Review";
import Project from "@/lib/models/Project";
import ServiceCategory from '@/lib/models/ServiceCategory';
import { Types } from 'mongoose';
import { DisplayProfessional, SelectedService } from '@/types/professional';

interface LeanUser {
  _id: Types.ObjectId;
  name: string;
  image?: string;
  businessInfo?: {
    companyName?: string;
    specialties?: string[];
    serviceArea?: string[];
  };
  selectedServices?: Array<{
    categoryId: string;
    optionId: string;
    _id?: Types.ObjectId;
  }>;
  isFavorite?: boolean;
}

interface ProjectWithImages {
  contractor: Types.ObjectId;
  images: Array<{
    url: string;
    caption?: string;
  }>;
}

async function getProfessionals(): Promise<{
  professionals: DisplayProfessional[];
  categories: Array<{ slug: string; name: string; }>;
}> {
  try {
    await dbConnect();
    
    // Get all service categories
    const allCategories = await ServiceCategory.find().select('slug name').lean();

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
      selectedServices: 1
    }).lean<LeanUser[]>();

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

    return {
      professionals: professionals.map(pro => {
        const proRating = ratingsMap.get(pro._id.toString());
        const projectImages = projectImagesMap.get(pro._id.toString()) || [];
        
        // Extract URLs from project images and ensure they are valid URLs
        const projectImageUrls = projectImages
          .filter(img => img && typeof img === 'string' && img.trim() !== '')
          .slice(0, 4); // Limit to 4 project images
        
        // Create array of valid images
        const images: string[] = [];
        
        // Add profile image if it exists and is valid
        if (pro.image && typeof pro.image === 'string' && pro.image.trim() !== '') {
          images.push(pro.image);
        }
        
        // Add project images
        images.push(...projectImageUrls);
        
        // Get unique category IDs and serialize the selectedServices
        const serializedServices = pro.selectedServices?.map(service => ({
          categoryId: service.categoryId,
          optionId: service.optionId
        })) || [];
        const uniqueCategories = [...new Set(serializedServices.map(service => service.categoryId))];
        const firstCategory = uniqueCategories[0] || '';
        const additionalCategories = uniqueCategories.length > 1 ? uniqueCategories.length - 1 : 0;
        
        // Get category name from the map
        const categoryName = categoryNameMap.get(firstCategory) || '';
        const specialty = categoryName + (additionalCategories > 0 ? ` (+${additionalCategories})` : '');
        
        return {
          id: pro._id.toString(),
          name: pro.name,
          businessName: pro.businessInfo?.companyName || pro.name,
          images, // This will be an empty array if no valid images are found
          rating: proRating?.rating || 0,
          reviewCount: proRating?.count || 0,
          specialty,
          location: pro.businessInfo?.serviceArea?.[0] || '',
          isFavorite: pro.isFavorite || false,
          selectedServices: serializedServices
        } as DisplayProfessional;
      }),
      categories
    };
  } catch (error) {
    return {
      professionals: [],
      categories: []
    };
  }
}

export default async function FindProfessionals() {
  const { professionals, categories } = await getProfessionals();

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-zinc-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-[22px] py-24">
            <div className="text-center">
              <h1 className="font-roboto text-4xl md:text-6xl font-medium text-gray-900 tracking-tight mb-6">
                Find Trusted Professionals
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-roboto">
                Connect with experienced, community-recommended professionals for your home improvement projects
              </p>
              <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                  />
                  <button className="bg-black text-white font-roboto px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors whitespace-nowrap">
                    Search
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-roboto">
                Popular: Kitchen Remodel, Bathroom Renovation, Interior Design
              </p>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000A_1px,transparent_1px),linear-gradient(to_bottom,#0000000A_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
        </section>

        {/* Service Categories and Professionals Grid */}
        <div className="container mx-auto px-4">
          <ClientProfessionals professionals={professionals} categories={categories} />
        </div>
      </div>
      <Footer />
    </>
  );
}
