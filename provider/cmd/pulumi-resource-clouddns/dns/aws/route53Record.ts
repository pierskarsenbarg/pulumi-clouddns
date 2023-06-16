import {ComponentResource, ComponentResourceOptions, Output} from "@pulumi/pulumi";
import {Record, RecordType} from "@pulumi/aws/route53";

interface Route53RecordArgs {
    hostedZoneId: Output<string>;
    recordName: string;
    recordType: RecordType;
    ttl: number;
}

export class Route53Record extends ComponentResource {
    constructor(name: string, args: Route53RecordArgs, opts?: ComponentResourceOptions) {
        super("clouddns:index:Route53Record", name, args, opts);

        const hostedZoneId: Output<string> = args.hostedZoneId;
        const ttl: number = args.ttl;
        const recordType: RecordType = args.recordType;
        const recordName: string = args.recordName;
        
        new Record(`${name}-route53record`, {
            zoneId: hostedZoneId,
            ttl: ttl,
            type: recordType,
            name: recordName
        });
    }
}