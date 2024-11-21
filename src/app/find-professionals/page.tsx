import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProfessionalsGrid from "@/components/ProfessionalsGrid";
import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/lib/models/User";
import Review from "@/lib/models/Review";
import Project, { IProject } from "@/lib/models/Project";
import { Document, Types } from 'mongoose';

interface LeanUser {
  _id: Types.ObjectId;
  name: string;
  image?: string;
  businessInfo?: {
    companyName?: string;
    specialties?: string[];
    serviceArea?: string[];
  };
  isFavorite?: boolean;
}

interface DisplayProfessional {
  id: string;
  name: string;
  businessName: string;
  images: string[];
  rating: number;
  reviewCount: number;
  specialty: string;
  location: string;
  isFavorite: boolean;
}

async function getProfessionals(): Promise<DisplayProfessional[]> {
  try {
    await dbConnect();
    console.log('Fetching professionals...');
    
    // First get all professionals
    const professionals = await User.find({ 
      isPro: true,
      status: 'active'
    }).select({
      name: 1,
      image: 1,
      businessInfo: 1,
      status: 1,
      isFavorite: 1
    }).lean<LeanUser[]>();

    console.log('Found professionals:', professionals.length);

    // Get all reviews for these professionals
    const professionalIds = professionals.map(pro => pro._id);
    
    // Fetch projects and their images for each professional
    const projects = await Project.find({
      contractor: { $in: professionalIds },
      status: { $in: ['completed', 'in_progress'] }
    })
    .select('contractor images')
    .lean();

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

    return professionals.map(pro => {
      const proRating = ratingsMap.get(pro._id.toString());
      const projectImages = projectImagesMap.get(pro._id.toString()) || [];
      const allImages = pro.image ? [pro.image, ...projectImages] : projectImages;
      
      return {
        id: pro._id.toString(),
        name: pro.name,
        businessName: pro.businessInfo?.companyName || pro.name,
        images: allImages,
        rating: proRating?.rating || 0,
        reviewCount: proRating?.count || 0,
        specialty: pro.businessInfo?.specialties?.[0] || '',
        location: pro.businessInfo?.serviceArea?.[0] || '',
        isFavorite: pro.isFavorite || false
      };
    });
  } catch (error) {
    console.error('Error fetching professionals:', error);
    return [];
  }
}

export default async function FindProfessionals() {
  const professionals = await getProfessionals();
  console.log('Rendering professionals:', professionals.length);

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

        {/* Professionals Grid Section */}
        <ProfessionalsGrid professionals={professionals} />
        
      </div>
      <Footer />
    </>
  );
}
