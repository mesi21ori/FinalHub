import { PageType } from "@/app/type";

export const tableHeadersConfig: Record<PageType, string[]> = {
    publicUserPage: ["ID", "Username", "Email", "Entering Date", "Action", "View"],
    researcherPage: ["ID", "Username", "Email", "Entering Date", "Academic Level", "Action", "View"],
    premiumUserPage: ["ID", "Username", "Email", "Entering Date", "Type of Subscription", "Action", "View"],
    uploaderPage: ["ID", "Username", "Email", "Entering Date", "Institution", "Action", "View"],
    reviewerPage: ["ID", "Username", "Email", "Entering Date", "Institution", "Action", "View"],
    institutionPage: ["ID", "Name", "Email", "Phone", "InstitutionType", "Entering Date", "Actions", "View"],
    institutionAdminPage: ["ID", "Username", "Email", "Entering Date", "Institution", "Action", "View"],
    // videoPage: ["ID", "Title", "Publisher", "Event Type", "Publication Date", "Number of Views", "Actions"],
    // musicPage: ["ID", "Name", "Music Type", "Language", "Number of Views", "Action"],
    // bookPage: ["ID", "Name", "Email", "Entering Date", "Institution", "Action", "View"],
    // artifactPage: ["ID", "Name", "Email", "Entering Date", "Institution", "Action", "View"],
    // articlePage: ["ID", "Name", "Email", "Entering Date", "Institution", "Action", "View"],
    // // New pages
    historicalVideoPage: ["ID", "Title", "Publisher", "Event Type", "Publication Date", "Number of Views", "Actions"],
    ContactPersonPage: ["ID", "Name", "Email", "Phone", "Institution", "Actions"],
  };
  