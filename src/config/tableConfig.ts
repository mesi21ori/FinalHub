import { PageType } from "@/app/type";

export const tableHeadersConfig: Record<PageType, string[]> = {
  publicUserPage: ["ID", "Username", "Email", "Entering Date", "Action", "View"],

  researcherPage: ["ID", "Username", "Email", "Entering Date", "Academic Level", "Action", "View"],

  premiumUserPage: ["ID", "Username", "Email", "Entering Date", "Type of Subscription", "Action", "View"],

  uploaderPage: ["ID", "Username", "Email", "Entering Date", "Institution", "Action", "View"],

  reviewerPage: ["ID", "Username", "Email", "Entering Date", "Institution", "Action", "View"],

  institutionPage: ["ID", "Name", "Email", "Phone", "InstitutionType", "Entering Date", "Actions", "View"],

  institutionAdminPage: ["ID", "Username", "Email", "Entering Date", "Institution", "Action", "View"],

  staffListPage: ["ID", "Username", "Email", "Role", "Entering Date", "Action", "View"],

  historicalVideoPage: ["ID", "Title", "Publisher", "Event Type", "Publication Date", "Number of Views", "Actions"],

  ContactPersonPage: ["ID", "Name", "Email", "Phone", "Institution", "Actions"],
};