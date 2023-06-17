import {ComponentResource, ComponentResourceOptions, Output} from "@pulumi/pulumi";
import {DnsZone} from "@pulumi/akamai/edgedns";

interface DnsZoneArgs {
    domainName: string
}

export class EdgeDnsZone extends ComponentResource {
    constructor(name: string, args: DnsZoneArgs, opts?: ComponentResourceOptions){
        super("clouddns:index:EdgeDnsZone", name, args, opts);

        const domainName: string = args.domainName;

       
    }
}