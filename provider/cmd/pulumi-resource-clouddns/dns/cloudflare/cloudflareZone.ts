import {ComponentResource, ComponentResourceOptions, Output} from "@pulumi/pulumi";
import {Provider, Zone} from "@pulumi/cloudflare";

interface CloudflareZoneArgs {
    cloudflareAccountId: string;
    zone: string;
    cloudflareProvider: Provider;
}

export class CloudflareZone extends ComponentResource {
    public readonly ZoneId: Output<string>;
    public readonly NameServers: Output<string[]>;
    constructor(name: string, args: CloudflareZoneArgs, opts?: ComponentResourceOptions) {
        super("clouddns:index:cloudFlareZone", name, args, opts);

        const zone = new Zone("cloudflareZone", {
            accountId: args.cloudflareAccountId,
            zone: args.zone
        }, {provider: args.cloudflareProvider});

        this.ZoneId = zone.id;
        this.NameServers = zone.nameServers;
        this.registerOutputs({
            "ZoneId": this.ZoneId,
            "NameServers": this.NameServers
        });
    }
}