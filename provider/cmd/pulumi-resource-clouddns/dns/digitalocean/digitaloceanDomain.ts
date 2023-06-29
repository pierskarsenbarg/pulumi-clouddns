import {ComponentResource, ComponentResourceOptions, ResourceOptions, Output} from "@pulumi/pulumi";
import { Domain, DomainArgs, Provider } from "@pulumi/digitalocean";

interface DigitalOceanDomainArgs {
    digitalOceanProvider: Provider;
    domainName: string,
    ipAddress?: string
}

export class DigitalOceanDomain extends ComponentResource {
    public readonly DomainId: Output<string>;
    constructor(name: string, args: DigitalOceanDomainArgs, opts?: ComponentResourceOptions) {
        super("clouddns:index:DigitalOceanDomain", name, args, opts);

        let resourceOptions: ResourceOptions = {
            parent: this,
            provider: args.digitalOceanProvider,
        };

        if(opts !== undefined) {
            resourceOptions = {
                ...opts,
                ...resourceOptions
            }
        }

        const resourceArgs: DomainArgs = {
            name: args.domainName
        };

        if(args.ipAddress !== undefined) {
            resourceArgs.ipAddress = args.ipAddress;
        }

        const domain = new Domain("digitalOceanDomain", resourceArgs, resourceOptions);

        this.DomainId = domain.id;
        this.registerOutputs({
            "DomainId": this.DomainId
        })
    }
}