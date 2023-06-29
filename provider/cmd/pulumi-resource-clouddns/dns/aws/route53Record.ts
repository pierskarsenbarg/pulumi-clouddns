import {ComponentResource, ComponentResourceOptions, Output} from "@pulumi/pulumi";
import {Record, RecordType} from "@pulumi/aws/route53";
import {Provider} from "@pulumi/aws";

interface Route53RecordArgs {
    hostedZoneId: Output<string>;
    recordName: string;
    recordType: RecordType;
    ttl: number;
    awsProvider: Provider;
    value: string;
}

export class Route53Record extends ComponentResource {
    constructor(name: string, args: Route53RecordArgs, opts?: ComponentResourceOptions) {
        super("clouddns:index:Route53Record", name, args, opts);

        const hostedZoneId: Output<string> = args.hostedZoneId;
        const ttl: number = args.ttl;
        const recordType: RecordType = args.recordType;
        const recordName: string = args.recordName;

        let resourceOptions: ResourceOptions = {
            parent: this,
            provider: args.awsProvider,
        };

        if (opts !== undefined) {
            resourceOptions = {
                ...resourceOptions,
                ...opts
            }
        }
        
        new Record(`${name}-route53record`, {
            zoneId: hostedZoneId,
            ttl: ttl,
            type: recordType,
            name: recordName,
            records: [args.value]
        }, resourceOptions);
    }
}