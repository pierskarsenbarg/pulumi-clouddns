import {ComponentResource, ComponentResourceOptions, Output, ResourceOptions} from "@pulumi/pulumi";
import {Zone} from "@pulumi/aws/route53";
import {Provider} from "@pulumi/aws";
import * as aws from "@pulumi/aws";

interface Route53ZoneArgs {
    domainName: string;
    awsProvider: Provider;
}

export class Route53Zone extends ComponentResource {
    public readonly zoneId: Output<string>;
    public readonly nameServers: Output<string[]>;
    constructor(name: string, args: Route53ZoneArgs, opts?: ComponentResourceOptions) {
        super("clouddns:index:Route53Zone", name, args, opts);

        const domainName: string = args.domainName;

        if(domainName.length == 0) {
            throw new Error("You must specify a [domainName]");
        }

        let resourceOpts: ResourceOptions = {
            parent: this,
            provider: args.awsProvider
        }

        if (opts !== undefined) {
            resourceOpts = {
                ...resourceOpts,
                ...opts
            };
        }

        const hostedZone = new Zone(`${name}-route53zone`, {
            name: domainName
        }, resourceOpts);

        this.zoneId = hostedZone.zoneId;
        this.nameServers = hostedZone.nameServers;

        this.registerOutputs({
            "HostedZoneId": this.zoneId,
            "NameServers": this.nameServers,
        });
    }
}