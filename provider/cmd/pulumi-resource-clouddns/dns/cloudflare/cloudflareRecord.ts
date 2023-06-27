import {ComponentResource, ComponentResourceOptions} from "@pulumi/pulumi";
import {Provider, Record} from "@pulumi/cloudflare";

interface CloudflareRecordArgs {
    cloudflareAccountId: string;
    zoneId: string;
    cloudflareProvider: Provider;
    recordName: string;
    value: string;
    type: string;
    ttl: number;
}

export class CloudflareRecord extends ComponentResource {
    constructor(name: string, args: CloudflareRecordArgs, opts?: ComponentResourceOptions) {
        super("clouddns:index:cloudFlareZone", name, args, opts);

        new Record("cloudflarerecord", {
            zoneId: args.zoneId,
            name: args.recordName,
            value: args.value,
            type: args.type,
            ttl: args.ttl
        }, {provider: args.cloudflareProvider})
    }
}