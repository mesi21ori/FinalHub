
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
  phoneNumber?:string;
  researcherType?:string;
  positionTitle?:string;
  proofAffilation?:string;
  roleExplanation?:string;
  proofOfIdentity?:string;
  researchTopic?:string;
  purposeOfResearch?:string;
  HistricalContentRequested?:string[];
  intentedUse?:string;
  supportingDocuments?:string;
  academicLevel?: string;
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
  institutionId?: number;
}


export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum SubscriptionType {
  Weekly = "Weekly",
  Monthly = "Monthly",
  Yearly = "Yearly",
}




// Base interface for Common User Fields
interface BaseUser {
  id: number; // Unique identifier
  profilePicture: string; // URL/path to the user's profile picture
  firstName: string; // User's first name
  lastName: string; // User's last name
  username: string; // Unique username for the user
  email: string; // Email address
  gender: Gender; // Using the Gender enum
  enteringDate: Date; // Changed to Date type for better handling
  isActive: boolean; // Indicates if the user's account is active
}

// Public User Interface extends BaseUser
interface PublicUser extends BaseUser {
  dateOfBirth: Date; // Changed to Date type
  preferences?: string[]; // Optional user preferences
}

// Premium User Interface extends BaseUser
interface PremiumUser extends BaseUser {
  dateOfBirth: Date; // Date of Birth
  subscriptionDate: Date; // Subscription date
  subscriptionType: SubscriptionType; // Assume SubscriptionType is defined elsewhere
  preferences?: string[]; // Optional preferences
  isPremium: boolean; // Indicates if the user is a premium user
}

// Researcher Form Values Interface
type ResearcherFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender; // Using Gender enum
  phoneNumber?: string; // Optional
  researcherType: string; // 'Independent' or 'Institutional'
  institutionName?: string; // Optional
  positionTitle?: string; // Optional
  proofOfAffiliation?: File | null; // Optional
  roleExplanation?: string; // Optional
  proofOfIdentity?: File | null; // Optional
  researchTopic: string;
  purposeOfResearch: string;
  historicalContentRequested: string;
  intendedUse: string;
  supportingDocuments?: File | null; // Optional
  termsAgreed: boolean; // Terms acceptance checkbox
  ndaAccepted: boolean; // NDA acceptance checkbox
}; 

// Institution Interface
export interface Institution {
  id?: number; // Unique ID for the institution
  institutionName: string; 
  institutionType?: string; // Using the InstitutionType enum
  institutionLogo?: string; // Optional logo file upload
  institutionDescription: string; // Brief description of the institution
  country: string; 
  city: string; 
  street: string;
  postalCode: string;
  website: string;
  phone: string;
  email: string;
  establishedDate: string; // Changed to Date type

  // Collaborative details
  collaborationPurpose: string; 
  contentType: string[]; // Array of content types
  contentVolume: {
    amount: number;
    unit: string;
  }; // Estimated content volume
  proofOfInstitution: string;// Upload verification document
  contentOwnershipDeclaration: boolean; // Ownership declaration checkbox
  acceptTermsAndConditions: boolean; // Terms acceptance checkbox


// Authorized contact details
  authorizedContact: {
      firstName: string; 
      lastName: string;
      username: string; // Authorized account username
      position: string; // Authorized person's position
      gender: string; // Gender of the authorized contact
      role: string; // Fixed Role using the Role enum
      password: string; 
      confirmPassword: string; 
      isChecked: boolean; // Checkbox for agreement
  };
}

// Reviewer Interface extends BaseUser
interface Reviewer extends BaseUser {
  resumesReviewed: number; // Number of resumes reviewed
  institution: string; // Institution name
}

// Uploader Interface extends BaseUser
interface Uploader extends BaseUser {
  uploadedFiles: string[]; // Array of uploaded file identifiers or paths
}
// Institutional Admin Interface extends BaseUser
interface InstitutionalAdmin extends BaseUser {
  position: string; // Position within the institution
  role: string; // Fixed Role using the Role enum
  password: string; // Admin's password
  confirmPassword: string; // Confirmation of the password
  isChecked: boolean; // Indicates if terms and conditions were accepted
}
export interface HistoricalVideo {
  id: number;
  title: string;
  alternativeTitle: string;
  description: string;
  eventType?: string;
  coverImage?: string;
  videoUrl?: string;
  accessLevel: string;
  uploadedBy: string;
  uploadDate: string;
  lastEditBy: string;
  lastEditDate: string;
  isActive: boolean;
  numberOfViews: string;
  numberOfLikes: string;
  numberOfComments: string;
  videoDetails?: {
    language: string;
    subtitles?: string[];
    copyrightHolder?: string;
    significance?: string;
    historicalFigures?: string[];
    publisher: string;
    releasedDate?: string;
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
    resolution?: string;
    duration?: string;
    relatedArticles?: string[];
    publicationDate: string;
    [key: string]: any;
  };
}

export interface HistoricalMusic {
  id: number;
  title: string;
  alternativeTitle: string;
  description: string;
  eventType?: string;
  coverImage?: string;
  music?: string;
  accessLevel: string;
  uploadedBy: string;
  uploadDate: string;
  lastEditBy: string;
  lastEditDate: string;
  isActive: boolean;
  numberOfViews: string;
  numberOfLikes: string;
  numberOfComments: string;
  musicDetails?: {
    duration: string;
    alternativeTitle: string;
    composer: string;
    musicProducer: string;
    musicType: string;
    language: string;
    singer: string;
    additionalSinger: string[];
    melodyAuthor: string[];
    accessLevel: string;
    poemAuthor: string[];
    instrument: string[];
    instrumentPlayer: string[];
    audioQuality: string;
    musicAlbum: string;
    musicNumber: string;
    recorder: string;
    eventType: string;
    eventDate: string;
    historicalFigures: string[];
    location: string;
    significance: string;
    source: string;
    publisher: string;
    copyrightHolder: string;
    relatedArticles: string[];
    publicationDate: string;
  };
}

  
export interface HistoricalBook {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  bookFile: string;
  uploadedBy: string;
  uploadDate: string;
  lastEditBy: string;
  lastEditDate: string;
  isActive: boolean;
  numberOfViews: string;
  numberOfLikes: string;
  numberOfComments: string;
  bookDetails?: {
    ISBN: string;
    alternativeTitle: string;
    language: string;
    author: string;
    coAuthors: string;
    editor: string;
    numberOfPages: string;
    edition: string;
    bookType: string;
    publisher: string;
    accessLevel: string;
    significant: string;
    copyrightHolder: string;
    publicationDate: string;
    eventType: string;
  };
}

  export interface Article {
    id: number;
    title:string,
    article: string,
    alternativeTitle:string,
    coverImage:string,


description:string, // Maintain as a plain string to store HTML from Quill
    language:string,
    author:string,
    coAuthors:string,
    editor:string
    publisher:string,
    publicationtDate:string,
    eventType:string,
    historicalFigures:string[],
    source: string,
    accessLevel:string,
    relatedArticles:string[],
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
    title:string,
    description:string,
    fileUrl: string,
    accessLevel:string,
    eventType:string,
    uploadedBy: string;
    uploadDate: string;
    lastEditBy: string;
    lastEditDate: string;
    isActive: boolean;
    numberOfViews: number;
    numberOfLikes: number;
    numberOfComments: number;
    artifactDetails?:{
    format:string,
    resolution:string,
    aspectRatio:string,
    photoLocation:string,
    capturedDate:string,
    photographer:string,
    cameraMake:string,
    cameraModel:string,   
    historicalFigures:string[], 
    relatedArticles:string[],
 
    }
  }
  

  
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
    | "staffListPage"
    | "institutionPage"
    | "institutionAdminPage"
    | "historicalVideoPage"
    | "ContactPersonPage";