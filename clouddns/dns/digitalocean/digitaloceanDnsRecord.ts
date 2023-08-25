import {ComponentResource, ComponentResourceOptions, Output, ResourceOptions} from "@pulumi/pulumi";
import { DnsRecord, Provider } from "@pulumi/digitalocean";

interface DigitalOceanDnsRecordArgs {
    domain: Output<string>;
    type: string;
    value: string;
    digitalOceanProvider: Provider
}

export class DigitalOceanDnsRecord extends ComponentResource {
    constructor(name: string, args: DigitalOceanDnsRecordArgs, opts?: ComponentResourceOptions) {
        super("clouddns:index:DigitalOceanDnsRecord", name, args, opts);

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

        new DnsRecord("dnsrecord", {
            domain: args.domain,
            type: args.type,
            value: args.value
        }, resourceOptions)
    }
}