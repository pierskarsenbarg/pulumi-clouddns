import {ComponentResource, ComponentResourceOptions} from "@pulumi/pulumi";

interface ZoneArgs { 
    targets: string[];
}

export class Zone extends ComponentResource {
    constructor(name: string, args: ZoneArgs, opts?: ComponentResourceOptions) {
        super("clouddns:index:zone", name, args, opts);
    }
}