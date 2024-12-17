// User data structure
export interface User {
  type: "public" | "premium" | "researcher" | "institution" | "uploader" | "reviewer"|"institutional admin";
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  enteringDate: string; // You can use Date type here if the field should be a date
  isActive: boolean;
  preferences?: string[];
  profilePicture: string;
  Gender?: string;
  DateOfBirth?: string;
  subscriptionDate?: string;
  subscriptionType?: string;
  academicLevel?: string;
  academicFile?: string;
  resume?: string;
  name?: string;
  location?: string;
  phone?: string;
  InstitutionType?: "Church" | "University" | "Museum" | "Other";  
  staffList?: string[];
  roles?: string[];
  institutionName?: string;
  uploadedFile?: string[];
  institution?: string;
  reviewedResumes?: string[];
}

export interface Content {
  id: number;
  title: string;
  description: string;
  fileUrl?: string;
  accessLevel: string;
  uploaderId: number;
  institutionId: number;
  viewOnly: boolean;
  isFree: boolean;
  eventType: string;
  createdAt: string;
  updatedAt: string;
  videoDetails: HistoricalVideo; // Ensure this is populated in your query
  musicDetails: HistoricalMusic;
  photoDetails: HistoricalPhoto;
  bookDetails: HistoricalBook;
}

export interface HistoricalVideo  {
  id: number;
  alternativeTitle: string;
  language: string;
  subtitles?: string[];
  copyrightHolder?: string;
  significance?: string;
  historicalFigures?: string[];
  publisher: string;
  director?: string;
  producer?: string;
  cameraman?: string[];
  cinematographer?: string;
  cast?: string[];
  eventDate?: string;
  preservationStatus?: string;
  source?: string;
  ageRating?: string;
  location?: string;
  coverImage?: string;
  resolution?: string;
  duration?: string;
  relatedArticles?: string[];
  publicationDate: string;
  numberOfViews: string;
  numberOfLikes: string;
  numberOfComments: string;
  uploadedBy: string;
  uploadDate: string;
  lastEditBy: string;
  lastEditDate: string;
  isActive: boolean;
}

  export interface HistoricalMusic {
    id: number; 
    title: string; 
    alternativeTitle: string;
    albumImage?: string; 
    subtitle: string[]; 
    description: string; 
    duration?: string; 
    composer?: string; 
    musicProducer?: string; 
    musicType?:string;
    singer?: string;
    additionalSinger?: string[];
    melodyAuthor?: string[];
    poemAuthor?: string[];
    instrument?: string[];
    instrumentPlayer?: string[];
    musicAlbum?: string;
    musicNumber?: string;
    recorder?: string;
    eventDate?: string;
    location?: string;
    significance?: string;
    historicalFigures?: string[];
    preservationStatus?: string; 
    source?: boolean;
    publisher: string;
    publicationDate: string;
    copyrightHolder?: string;
    language: string;
    uploadedBy: string;
    uploadDate: string;
    lastEditBy: string;
    lastEditDate: string;
    isActive: boolean,
  }
  
  export interface HistoricalBook {
    id: number; 
    title: string; 
    alternativeTitle?: string; 
    coverImage?: string; 
    subtitle?: string[];
    description: string;
    author?: string;
    coAuthors?: string[];
    editor?: string[];
    numberOfPages?: string;
    edition?: string;
    bookType?: string;
    series?: string;
    seriesNumber?: string;
    publisher?: string;
    publicationDate?: string;
    copyrightHolder?: string;
    eventDate?: string;
    location?: string;
    eventType?: string;
    significance?: string;
    historicalFigures?: string[];
    preservationStatus?: string;
    primarySource?: boolean;
    uploadedBy: string; 
    uploadDate: string; 
    lastEditBy: string; 
    lastEditDate: string;
    isActive: boolean,
  }
  export interface Article {
    id: number;
    title: string;
    alternativeTitle?: string;
    coverImage?: string;
    description: string;
    language: string;
    author: string;
    coAuthors?: string[];
    editor?: string[];
    publisher: string;
    publicationDate: string;
    eventDate?: string;
    location?: string;
    eventType?: string;
    significance?: string;
    historicalFigures?: string[];
    primarySource?: boolean;
    numberOfViews?: number;
    numberOfLikes?: number; 
    numberOfComments?: number; 
    uploadedBy: string;
    uploadDate: string;

lastEditBy: string;
    lastEditDate: string;
    isActive: boolean,
  }
  
  export interface HistoricalPhoto {
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
    format?: string; 
    resolution?: string; 
    aspectRatio?: string; 
    photoLocation?: string; 
    capturedDate?: string; 
    photographer?: string; 
    cameraMake?: string; 
    cameraModel?: string; 
    eventType?: string; 
    historicalFigures?: string[];
    significance?: string;
    numberOfViews: number;
    numberOfLikes: number;
    numberOfComments: number;
    uploadedBy: string; 
    uploadDate: string; 
    lastEditBy?: string;
    lastEditDate?: string; 
    isActive: boolean; 
  }
  

  export type SubscriptionType = "Weekly" | "Monthly" | "Yearly";
  
  // User access level
  export enum AccessLevel {
    Admin = "Admin",
    User = "User",
    Premium = "Premium",
    Uploader = "Uploader",
    Reviewer = "Reviewer",
    Institutional = "Institutional",
  }
  
 
  export type PageType =
    | "publicUserPage"
    | "researcherPage"
    | "premiumUserPage"
    | "uploaderPage"
    | "reviewerPage"
    | "institutionPage"
    | "historicalVideoPage";
      
  // Enum for Institution Types
  export enum InstitutionType {
    Church = "Church",
    University = "University",
    Museum = "Museum",
    Other = "Other",
  }