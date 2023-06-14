import * as clouddns from "@pulumi/clouddns";

const page = new clouddns.StaticPage("page", {
    indexContent: "<html><body><p>Hello world!</p></body></html>",
});

export const bucket = page.bucket;
export const url = page.websiteUrl;
