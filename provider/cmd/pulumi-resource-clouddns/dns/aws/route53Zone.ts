import {ComponentResource, ComponentResourceOptions, Output} from "@pulumi/pulumi";
import {Zone} from "@pulumi/aws/route53";

interface Route53ZoneArgs {
    domainName: string
}

export class Route53Zone extends ComponentResource {
    public readonly hostedZoneId: Output<string>;
    public readonly nameServers: Output<string[]>;
    public readonly primaryNameServer: Output<string>;
    constructor(name: string, args: Route53ZoneArgs, opts?: ComponentResourceOptions) {
        super("clouddns:index:Route53Zone", name, args, opts);

        const domainName: string = args.domainName;

        if(domainName.length == 0) {
            throw new Error("You must specify a [domainName]");
        }

        if (opts !== undefined) {
            opts = {parent: this, ...opts};
        }

        const hostedZone = new Zone(`${name}-route53zone`, {
            name: domainName
        }, opts);

        this.hostedZoneId = hostedZone.zoneId;
        this.nameServers = hostedZone.nameServers;
        this.primaryNameServer = hostedZone.primaryNameServer;

        this.registerOutputs({
            "HostedZoneId": this.hostedZoneId,
            "NameServers": this.nameServers,
            "PrimaryNameServer": this.primaryNameServer
        });
    }
}