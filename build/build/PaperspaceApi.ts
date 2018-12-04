import request, {
    SuperAgentStatic,
    SuperAgentRequest,
    Response
} from "superagent";

export type RequestHeaders = {
    [header: string]: string;
}
export type RequestHeadersHandler = (headers: RequestHeaders) => RequestHeaders;
export type ConfigureAgentHandler = (agent: SuperAgentStatic) => SuperAgentStatic;
export type ConfigureRequestHandler = (agent: SuperAgentRequest) => SuperAgentRequest;
export type CallbackHandler = (err: any, res ? : request.Response) => void;
export type Error = {
    'code' ? : number

    'message' ? : string

};
export type JobsArtifactsGet = {
    'Credentials' ? : {
        'AccessKeyId' ? : string

        'SecretAccessKey' ? : string

        'SessionToken' ? : string

    }

    'bucket' ? : string

    'folder' ? : string

};
export type JobsArtifactsList = Array < {
        'file': string

        'size': number

    } >
    | {
        'file': string

        'size': number

    }

;
export type JobsClone = {
    'artifactsDirectory' ? : string

    'cluster' ? : string

    'container' ? : string

    'dtCreated' ? : string

    'dtDeleted' ? : string

    'dtFinished' ? : string

    'dtModified' ? : string

    'dtProvisioningFinished' ? : string

    'dtProvisioningStarted' ? : string

    'dtStarted' ? : string

    'dtTeardownFinished' ? : string

    'dtTeardownStarted' ? : string

    'entrypoint' ? : string

    'exitCode' ? : number

    'id' ? : string

    'jobError' ? : boolean

    'machineType' ? : string

    'name' ? : string

    'parentJobId' ? : string

    'project' ? : string

    'projectId' ? : string

    'startedByUserId' ? : string

    'state' ? : string

    'usageRate' ? : string

    'workingDirectory' ? : string

    'workspaceUrl' ? : string

};
export type JobsCreate = {
    'artifactsDirectory' ? : string

    'cluster' ? : string

    'clusterMachine' ? : string

    'container' ? : string

    'dtCreated' ? : string

    'dtDeleted' ? : string

    'dtFinished' ? : string

    'dtModified' ? : string

    'dtProvisioningFinished' ? : string

    'dtProvisioningStarted' ? : string

    'dtStarted' ? : string

    'dtTeardownFinished' ? : string

    'dtTeardownStarted' ? : string

    'entrypoint' ? : string

    'exitCode' ? : number

    'id' ? : string

    'ipAddress' ? : string

    'jobError' ? : boolean

    'machineType' ? : string

    'name' ? : string

    'parentJobId' ? : string

    'ports' ? : string

    'project' ? : string

    'projectId' ? : string

    'startedByUserId' ? : string

    'state' ? : string

    'storageRegion' ? : string

    'usageRate' ? : string

    'workingDirectory' ? : string

    'workspaceUrl' ? : string

};
export type JobsList = Array < {
        'artifactsDirectory' ? : string

        'cluster' ? : string

        'container' ? : string

        'dtCreated' ? : string

        'dtDeleted' ? : string

        'dtFinished' ? : string

        'dtModified' ? : string

        'dtProvisioningFinished' ? : string

        'dtProvisioningStarted' ? : string

        'dtStarted' ? : string

        'dtTeardownFinished' ? : string

        'dtTeardownStarted' ? : string

        'entrypoint' ? : string

        'exitCode' ? : number

        'id' ? : string

        'jobError' ? : boolean

        'machineType' ? : string

        'name' ? : string

        'parentJobId' ? : string

        'project' ? : string

        'projectId' ? : string

        'startedByUserId' ? : string

        'state' ? : string

        'usageRate' ? : string

        'workingDirectory' ? : string

        'workspaceUrl' ? : string

    } >
    | {
        'artifactsDirectory' ? : string

        'cluster' ? : string

        'container' ? : string

        'dtCreated' ? : string

        'dtDeleted' ? : string

        'dtFinished' ? : string

        'dtModified' ? : string

        'dtProvisioningFinished' ? : string

        'dtProvisioningStarted' ? : string

        'dtStarted' ? : string

        'dtTeardownFinished' ? : string

        'dtTeardownStarted' ? : string

        'entrypoint' ? : string

        'exitCode' ? : number

        'id' ? : string

        'jobError' ? : boolean

        'machineType' ? : string

        'name' ? : string

        'parentJobId' ? : string

        'project' ? : string

        'projectId' ? : string

        'startedByUserId' ? : string

        'state' ? : string

        'usageRate' ? : string

        'workingDirectory' ? : string

        'workspaceUrl' ? : string

    }

;
export type JobsLogs = Array < {
        'line' ? : number

        'message' ? : string

    } >
    | {
        'line' ? : number

        'message' ? : string

    }

;
export type JobsMachineTypes = Array < {
        'cluster': string

        'isBusy': boolean

        'machineType': string

        'region': string

    } >
    | {
        'cluster': string

        'isBusy': boolean

        'machineType': string

        'region': string

    }

;
export type JobsShow = {
    'artifactsDirectory' ? : string

    'cluster' ? : string

    'container' ? : string

    'dtCreated' ? : string

    'dtDeleted' ? : string

    'dtFinished' ? : string

    'dtModified' ? : string

    'dtProvisioningFinished' ? : string

    'dtProvisioningStarted' ? : string

    'dtStarted' ? : string

    'dtTeardownFinished' ? : string

    'dtTeardownStarted' ? : string

    'entrypoint' ? : string

    'exitCode' ? : number

    'id' ? : string

    'jobError' ? : boolean

    'machineType' ? : string

    'name' ? : string

    'parentJobId' ? : string

    'project' ? : string

    'projectId' ? : string

    'startedByUserId' ? : string

    'state' ? : string

    'usageRate' ? : string

    'workingDirectory' ? : string

    'workspaceUrl' ? : string

};
export type JobsWaitfor = {
    'artifactsDirectory' ? : string

    'cluster' ? : string

    'container' ? : string

    'dtCreated' ? : string

    'dtDeleted' ? : string

    'dtFinished' ? : string

    'dtModified' ? : string

    'dtProvisioningFinished' ? : string

    'dtProvisioningStarted' ? : string

    'dtStarted' ? : string

    'dtTeardownFinished' ? : string

    'dtTeardownStarted' ? : string

    'entrypoint' ? : string

    'exitCode' ? : number

    'id' ? : string

    'jobError' ? : boolean

    'machineType' ? : string

    'name' ? : string

    'parentJobId' ? : string

    'project' ? : string

    'projectId' ? : string

    'startedByUserId' ? : string

    'state' ? : string

    'usageRate' ? : string

    'workingDirectory' ? : string

    'workspaceUrl' ? : string

};
export type LoginUser = {
    'key': string

    'name': string

};
export type MachinesAvailability = {
    'available' ? : boolean

};
export type MachinesCreate = {
    'agentType' ? : string

    'autoSnapshotFrequency' ? : number

    'autoSnapshotSaveCount' ? : number

    'cpus' ? : number

    'dtCreated' ? : string

    'dtLastRun' ? : string

    'dynamicPublicIp' ? : string

    'gpu' ? : string

    'id' ? : string

    'name' ? : string

    'networkId' ? : string

    'os' ? : string

    'performAutoSnapshot' ? : boolean

    'privateIpAddress' ? : string

    'publicIpAddress' ? : string

    'ram' ? : string

    'region' ? : string

    'scriptId' ? : string

    'shutdownTimeoutForces' ? : boolean

    'shutdownTimeoutInHours' ? : number

    'state' ? : string

    'storageTotal' ? : string

    'storageUsed' ? : string

    'teamId' ? : string

    'updatesPending' ? : boolean

    'usageRate' ? : string

    'userId' ? : string

};
export type MachinesList = Array < {
        'agentType' ? : string

        'autoSnapshotFrequency' ? : number

        'autoSnapshotSaveCount' ? : number

        'cpus' ? : number

        'dtCreated' ? : string

        'dtLastRun' ? : string

        'dynamicPublicIp' ? : string

        'gpu' ? : string

        'id' ? : string

        'name' ? : string

        'networkId' ? : string

        'os' ? : string

        'performAutoSnapshot' ? : boolean

        'privateIpAddress' ? : string

        'publicIpAddress' ? : string

        'ram' ? : string

        'region' ? : string

        'scriptId' ? : string

        'shutdownTimeoutForces' ? : boolean

        'shutdownTimeoutInHours' ? : number

        'state' ? : string

        'storageTotal' ? : string

        'storageUsed' ? : string

        'teamId' ? : string

        'updatesPending' ? : boolean

        'usageRate' ? : string

        'userId' ? : string

    } >
    | {
        'agentType' ? : string

        'autoSnapshotFrequency' ? : number

        'autoSnapshotSaveCount' ? : number

        'cpus' ? : number

        'dtCreated' ? : string

        'dtLastRun' ? : string

        'dynamicPublicIp' ? : string

        'gpu' ? : string

        'id' ? : string

        'name' ? : string

        'networkId' ? : string

        'os' ? : string

        'performAutoSnapshot' ? : boolean

        'privateIpAddress' ? : string

        'publicIpAddress' ? : string

        'ram' ? : string

        'region' ? : string

        'scriptId' ? : string

        'shutdownTimeoutForces' ? : boolean

        'shutdownTimeoutInHours' ? : number

        'state' ? : string

        'storageTotal' ? : string

        'storageUsed' ? : string

        'teamId' ? : string

        'updatesPending' ? : boolean

        'usageRate' ? : string

        'userId' ? : string

    }

;
export type MachinesShow = {
    'agentType' ? : string

    'autoSnapshotFrequency' ? : number

    'autoSnapshotSaveCount' ? : number

    'cpus' ? : number

    'dtCreated' ? : string

    'dtLastRun' ? : string

    'dynamicPublicIp' ? : string

    'events' ? : Array < {
            'dtCreated': string

            'dtFinished': string

            'dtModified': string

            'errorMsg': string

            'handle': string

            'name': string

            'state': string

        } >
        | {
            'dtCreated': string

            'dtFinished': string

            'dtModified': string

            'errorMsg': string

            'handle': string

            'name': string

            'state': string

        }

    'gpu' ? : string

    'id' ? : string

    'name' ? : string

    'networkId' ? : string

    'os' ? : string

    'performAutoSnapshot' ? : boolean

    'privateIpAddress' ? : string

    'publicIpAddress' ? : string

    'ram' ? : string

    'region' ? : string

    'scriptId' ? : string

    'shutdownTimeoutForces' ? : boolean

    'shutdownTimeoutInHours' ? : number

    'state' ? : string

    'storageTotal' ? : string

    'storageUsed' ? : string

    'teamId' ? : string

    'updatesPending' ? : boolean

    'usageRate' ? : string

    'userId' ? : string

};
export type MachinesUtilization = {
    'machineId' ? : string

    'storageUtilization' ? : {
        'billingMonth' ? : string

        'machineId' ? : string

        'monthlyRate' ? : string

        'secondsUsed' ? : number

    }

    'utilization' ? : {
        'billingMonth' ? : string

        'hourlyRate' ? : string

        'machineId' ? : string

        'secondsUsed' ? : number

    }

};
export type MachinesWaitfor = {
    'agentType' ? : string

    'autoSnapshotFrequency' ? : number

    'autoSnapshotSaveCount' ? : number

    'cpus' ? : number

    'dtCreated' ? : string

    'dtLastRun' ? : string

    'dynamicPublicIp' ? : string

    'gpu' ? : string

    'id' ? : string

    'name' ? : string

    'networkId' ? : string

    'os' ? : string

    'performAutoSnapshot' ? : boolean

    'privateIpAddress' ? : string

    'publicIpAddress' ? : string

    'ram' ? : string

    'region' ? : string

    'scriptId' ? : string

    'shutdownTimeoutForces' ? : boolean

    'shutdownTimeoutInHours' ? : number

    'state' ? : string

    'storageTotal' ? : string

    'storageUsed' ? : string

    'teamId' ? : string

    'updatesPending' ? : boolean

    'usageRate' ? : string

    'userId' ? : string

};
export type NetworksList = Array < {
        'dtCreated' ? : string

        'id' ? : string

        'name' ? : string

        'netmask' ? : string

        'network' ? : string

        'region' ? : string

        'teamId' ? : string

    } >
    | {
        'dtCreated' ? : string

        'id' ? : string

        'name' ? : string

        'netmask' ? : string

        'network' ? : string

        'region' ? : string

        'teamId' ? : string

    }

;
export type ScriptsCreate = {
    'description' ? : string

    'dtCreated' ? : string

    'id' ? : string

    'isEnabled' ? : boolean

    'name' ? : string

    'ownerId' ? : string

    'ownerType' ? : string

    'runOnce' ? : boolean

};
export type ScriptsList = Array < {
        'description' ? : string

        'dtCreated' ? : string

        'id' ? : string

        'isEnabled' ? : boolean

        'name' ? : string

        'ownerId' ? : string

        'ownerType' ? : string

        'runOnce' ? : boolean

    } >
    | {
        'description' ? : string

        'dtCreated' ? : string

        'id' ? : string

        'isEnabled' ? : boolean

        'name' ? : string

        'ownerId' ? : string

        'ownerType' ? : string

        'runOnce' ? : boolean

    }

;
export type ScriptsShow = {
    'description' ? : string

    'dtCreated' ? : string

    'id' ? : string

    'isEnabled' ? : boolean

    'machines' ? : Array < {
            'dtLastRun': string

            'machineId': string

        } >
        | {
            'dtLastRun': string

            'machineId': string

        }

    'name' ? : string

    'ownerId' ? : string

    'ownerType' ? : string

    'runOnce' ? : boolean

};
export type ScriptsText = string;
export type TemplatesList = Array < {
        'dtCreated': string

        'id': string

        'label': string

        'name': string

        'os': string

        'region' ? : string

        'teamId' ? : string

        'userId' ? : string

    } >
    | {
        'dtCreated': string

        'id': string

        'label': string

        'name': string

        'os': string

        'region' ? : string

        'teamId' ? : string

        'userId' ? : string

    }

;
export type UsersList = Array < {
        'dtCreated': string

        'email': string

        'firstname': string

        'id': string

        'lastname': string

        'teamId': string

    } >
    | {
        'dtCreated': string

        'email': string

        'firstname': string

        'id': string

        'lastname': string

        'teamId': string

    }

;

export type Logger = {
    log: (line: string) => any
};

export interface ResponseWithBody < T > extends Response {
    body: T;
}

/**
 * 
 * @class PaperspaceApi
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export class PaperspaceApi {

    private domain: string = "https://api.paperspace.io";
    private errorHandlers: CallbackHandler[] = [];
    private requestHeadersHandler ? : RequestHeadersHandler;
    private configureAgentHandler ? : ConfigureAgentHandler;
    private configureRequestHandler ? : ConfigureRequestHandler;

    constructor(domain ? : string, private logger ? : Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    getDomain() {
        return this.domain;
    }

    addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    setRequestHeadersHandler(handler: RequestHeadersHandler) {
        this.requestHeadersHandler = handler;
    }

    setConfigureAgentHandler(handler: ConfigureAgentHandler) {
        this.configureAgentHandler = handler;
    }

    setConfigureRequestHandler(handler: ConfigureRequestHandler) {
        this.configureRequestHandler = handler;
    }

    private request(method: string, url: string, body: any, headers: RequestHeaders, queryParameters: any, form: any, reject: CallbackHandler, resolve: CallbackHandler) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        const agent = this.configureAgentHandler ?
            this.configureAgentHandler(request) :
            request;

        let req = agent(method, url);
        if (this.configureRequestHandler) {
            req = this.configureRequestHandler(req);
        }

        req = req.query(queryParameters);

        if (body) {
            req.send(body);

            if (typeof(body) === 'object' && !(body.constructor.name === 'Buffer')) {
                headers['Content-Type'] = 'application/json';
            }
        }

        if (Object.keys(form).length > 0) {
            req.type('form');
            req.send(form);
        }

        if (this.requestHeadersHandler) {
            headers = this.requestHeadersHandler({ ...headers
            });
        }

        Object.keys(headers).forEach(key => {
            req.set(key, headers[key]);
        });

        req.end((error, response) => {
            if (error || !response.ok) {
                reject(error);
                this.errorHandlers.forEach(handler => handler(error));
            } else {
                resolve(response);
            }
        });
    }

    /**
     * Logs in the user and acquires an api key
     * @method
     * @name PaperspaceApi#LoginUser
     * @param {} email - Email address of the paperspace user to log in
     * @param {} password - Password for the specified email address
     * @param {} apiToken - Optional name of an existing API token for the user's account
     */
    LoginUser(parameters: {
        'email': string,
        'password': string,
        'apiToken' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < LoginUser >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/apiTokens/createPublic';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['email'] !== undefined) {
                body = parameters['email'];
            }

            if (parameters['email'] === undefined) {
                reject(new Error('Missing required  parameter: email'));
                return;
            }

            if (parameters['password'] !== undefined) {
                body = parameters['password'];
            }

            if (parameters['password'] === undefined) {
                reject(new Error('Missing required  parameter: password'));
                return;
            }

            if (parameters['apiToken'] !== undefined) {
                body = parameters['apiToken'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Get the artifacts files for the job with the given id
     * @method
     * @name PaperspaceApi#JobsArtifactsGet
     * @param {string} jobId - Id of the job to get artifacts for
     * @param {string} files - Optional; if getting only certain files, a wildcard pattern to match against, e.g., "myfiles*".  Note: if you include a wildcard you must double-quote the files argument.
     * @param {string} dest - Optional; an existing directory to copy the artifacts files to.
     * @param {boolean} json - Optional; return JSON object instead of writing to standard out.  '--json' with no value is equivalent to true.
     */
    JobsArtifactsGet(parameters: {
        'jobId': string,
        'files' ? : string,
        'dest' ? : string,
        'json' ? : boolean,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < JobsArtifactsGet >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/jobs/artifactsGet';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['jobId'] !== undefined) {
                queryParameters['jobId'] = parameters['jobId'];
            }

            if (parameters['jobId'] === undefined) {
                reject(new Error('Missing required  parameter: jobId'));
                return;
            }

            if (parameters['files'] !== undefined) {
                queryParameters['files'] = parameters['files'];
            }

            if (parameters['dest'] !== undefined) {
                queryParameters['dest'] = parameters['dest'];
            }

            if (parameters['json'] !== undefined) {
                queryParameters['json'] = parameters['json'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * List job artifact files for the specified job
     * @method
     * @name PaperspaceApi#JobsArtifactsList
     * @param {string} jobId - Id of the job to list artifacts for
     * @param {string} files - Optional; wildcard expression of file(s) to list, e.g., "myfiles*".  Note: if you include a wildcard you must double-quote the files argument.
     * @param {boolean} size - Optional; include file size in bytes.  '--size' with no value is equivalent to true.
     * @param {boolean} links - Optional; include https links to artifacts.  Note: links are only valid for 8 hours. '--links' with no value is equivalent to true.
     * @param {boolean} json - Optional; return JSON object instead of writing to standard out.  '--json' with no value is equivalent to true.
     */
    JobsArtifactsList(parameters: {
        'jobId': string,
        'files' ? : string,
        'size' ? : boolean,
        'links' ? : boolean,
        'json' ? : boolean,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < JobsArtifactsList >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/jobs/artifactsList';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['jobId'] !== undefined) {
                queryParameters['jobId'] = parameters['jobId'];
            }

            if (parameters['jobId'] === undefined) {
                reject(new Error('Missing required  parameter: jobId'));
                return;
            }

            if (parameters['files'] !== undefined) {
                queryParameters['files'] = parameters['files'];
            }

            if (parameters['size'] !== undefined) {
                queryParameters['size'] = parameters['size'];
            }

            if (parameters['links'] !== undefined) {
                queryParameters['links'] = parameters['links'];
            }

            if (parameters['json'] !== undefined) {
                queryParameters['json'] = parameters['json'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Create a new Paperspace job, and tail its log output if run at the command line
     * @method
     * @name PaperspaceApi#JobsCreate
     * @param {} container - A required reference to a docker image in a public or private docker registry, or a container name provided by Paperspace.  Docker image repository references must be in lowercase and may include a tag and a hostname prefix followed by a slash; if ommitted the hostname defaults to that of the public Docker Hub registry.  An example docker image reference: 'docker.io/mynamespace/myimage:mytag'.  A container name may be mixed case.  (Designated container names are currently only provided as part of various Gradient tutorials and samples.)
     * @param {} cluster - An optional cluster name of a cluster to run the job on. Only one of cluster or clusterId may be specified.
     * @param {} clusterId - An optional cluster id of a cluster to run the job on. Only one of cluster or clusterId may be specified.
     * @param {} machineType - An optional machine type to run the job on: either 'GPU+', 'P4000', 'P5000', 'P6000', 'V100', 'K80', 'P100', 'TPU', or 'GradientNode'.<p>Defaults to 'K80'. <P>Note: the 'K80', 'P100', and 'TPU' machineTypes run on Google Cloud Platform (GCP).  The other machineTypes run on the Paperspace Cloud.  Google Cloud platform and Paperspace Cloud have distict Job Storage spaces;  Job storage is not currently shared between these two cloud environments.
     * @param {} name - An optional name or description for this job.  If ommitted, the job name defaults to 'job N' where N represents the Nth job instance for the given project.
     * @param {} project - The name of the project for this job.  If not provided, this is taken from the .ps_project/config.json file, or the current directory name.
     * @param {} projectId - The poject id of an existing project for this job.  Note: if projectId is specified, the project parameter cannot be specified.
     * @param {} command - An optional command to run within the workspace or container.
     * @param {} workspace - An optional path to a workspace, or link to a git repository to upload and merge with the container.  If a zip file name is provided it is uploaded instead.  If no workspace is provided the current directory is zipped up and transferred.  If the workspace is 'none', no workspace is merged and the container is run as-is. To download a git repository provide an https repository link and optionally prefix it with 'git+', e.g. 'https://github.com/MyProjects/MyRepo.git'.  If the 'git+' prefix is not specified, it is added at the time of download to the job runner machine.  S3 links are also supported using the schema 's3://bucketname/objectname'.
     * @param {} codeCommit - An optional reference to git commit hash if local workspace is a git repository. Found at runtime.
     * @param {} dataset - An optional reference to a dataset to be merged with the container.
     * @param {} registryUsername - An optional username for accessing an image hosted on a private container registry.  Note: you must specify this option every time a private image is specified for the container.
     * @param {} registryPassword - An optional password for accessing an image hosted on a private container registry.  Note: you must specify this option every time a private image is specified for the container.
     * @param {} workspaceUsername - An optional username for accessing a private git repository.  Note: you must specify this option every time a private git repository is specified for the workspace.
     * @param {} workspacePassword - An optional password for accessing a private git repository.  We recommned using an OAuth token (GitHub instructions can be found <a href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/">here</a>).  Note: you must specify this option every time a private git repository is specified for the workspace.
     * @param {} ports - An optional list of port mappings to open on the job cluster machine while the job is running.  The port mappings are specified as 'XXXX:YYYY' where XXXX is an external port number and YYYY is an internal port number.  Mulitple port mappings can be provided as a comma separated list. Port numbers must be greater than 1023. Note: only /tcp protocol usage is supported.
     * @param {} sharedMemMBytes - Optional; shared memory size for the job container in megabytes (1 megabyte = 1024 * 1024 bytes).  Cannot exceed total memory size for the given machine type.
     * @param {} nodeAttrs - Optional; a JSON expression describing the node attributes for a compatible GradientNode machine to run this job.  See the Gradient-Node documentation for more info.
     * @param {} tail - Optional; defaults to true in command line mode only.  Specify false to disable automatic tailing.
     * @param {} json - Optional; if true, do not write progress to standard out.  '--json' with no value is equivalent to true.
     */
    JobsCreate(parameters: {
        'container': string,
        'cluster' ? : string,
        'clusterId' ? : string,
        'machineType' ? : string,
        'name' ? : string,
        'project' ? : string,
        'projectId' ? : string,
        'command' ? : string,
        'workspace' ? : string,
        'codeCommit' ? : string,
        'dataset' ? : string,
        'registryUsername' ? : string,
        'registryPassword' ? : string,
        'workspaceUsername' ? : string,
        'workspacePassword' ? : string,
        'ports' ? : string,
        'sharedMemMBytes' ? : number,
        'nodeAttrs' ? : number,
        'tail' ? : boolean,
        'json' ? : boolean,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/jobs/createJob';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['container'] !== undefined) {
                body = parameters['container'];
            }

            if (parameters['container'] === undefined) {
                reject(new Error('Missing required  parameter: container'));
                return;
            }

            if (parameters['cluster'] !== undefined) {
                body = parameters['cluster'];
            }

            if (parameters['clusterId'] !== undefined) {
                body = parameters['clusterId'];
            }

            if (parameters['machineType'] !== undefined) {
                body = parameters['machineType'];
            }

            if (parameters['name'] !== undefined) {
                body = parameters['name'];
            }

            if (parameters['project'] !== undefined) {
                body = parameters['project'];
            }

            if (parameters['projectId'] !== undefined) {
                body = parameters['projectId'];
            }

            if (parameters['command'] !== undefined) {
                body = parameters['command'];
            }

            if (parameters['workspace'] !== undefined) {
                body = parameters['workspace'];
            }

            if (parameters['codeCommit'] !== undefined) {
                body = parameters['codeCommit'];
            }

            if (parameters['dataset'] !== undefined) {
                body = parameters['dataset'];
            }

            if (parameters['registryUsername'] !== undefined) {
                body = parameters['registryUsername'];
            }

            if (parameters['registryPassword'] !== undefined) {
                body = parameters['registryPassword'];
            }

            if (parameters['workspaceUsername'] !== undefined) {
                body = parameters['workspaceUsername'];
            }

            if (parameters['workspacePassword'] !== undefined) {
                body = parameters['workspacePassword'];
            }

            if (parameters['ports'] !== undefined) {
                body = parameters['ports'];
            }

            if (parameters['sharedMemMBytes'] !== undefined) {
                body = parameters['sharedMemMBytes'];
            }

            if (parameters['nodeAttrs'] !== undefined) {
                body = parameters['nodeAttrs'];
            }

            if (parameters['tail'] !== undefined) {
                body = parameters['tail'];
            }

            if (parameters['json'] !== undefined) {
                body = parameters['json'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Return a list of available cluster machine types
     * @method
     * @name PaperspaceApi#JobsMachineTypes
     */
    JobsMachineTypes(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < JobsMachineTypes >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/jobs/getClusterAvailableMachineTypes';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Wait for the job with the given id to enter a certain job state
     * @method
     * @name PaperspaceApi#JobsWaitfor
     * @param {string} jobId - Id of the job to wait for
     * @param {string} state - Name of the state to wait for
     */
    JobsWaitfor(parameters: {
        'jobId': string,
        'state': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < JobsWaitfor >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/jobs/getJob';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['jobId'] !== undefined) {
                queryParameters['jobId'] = parameters['jobId'];
            }

            if (parameters['jobId'] === undefined) {
                reject(new Error('Missing required  parameter: jobId'));
                return;
            }

            if (parameters['state'] !== undefined) {
                queryParameters['state'] = parameters['state'];
            }

            if (parameters['state'] === undefined) {
                reject(new Error('Missing required  parameter: state'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * List information about all jobs available to either the current authenticated user or the team, if the user belongs to a team
     * @method
     * @name PaperspaceApi#JobsList
     */
    JobsList(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < JobsList >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/jobs/getJobs';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Stream the logs for the job with the given id, while the job is running or after it has stopped
     * @method
     * @name PaperspaceApi#JobsLogs
     * @param {string} jobId - Id of the job to logs
     * @param {boolean} tail - Optional; if tail is specified logs will be streamed until the job stops.
     * @param {number} line - Optional; if line is specified logs only logs after that line will be returned (up to limit).
     * @param {number} limit - Optional; number of log lines to retrieve on each request; default limit is 2000.
     * @param {boolean} json - Optional; return JSON object instead of writing to standard out.  '--json' with no value is equivalent to true.
     */
    JobsLogs(parameters: {
        'jobId': string,
        'tail' ? : boolean,
        'line' ? : number,
        'limit' ? : number,
        'json' ? : boolean,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < JobsLogs >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/jobs/logs';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['jobId'] !== undefined) {
                queryParameters['jobId'] = parameters['jobId'];
            }

            if (parameters['jobId'] === undefined) {
                reject(new Error('Missing required  parameter: jobId'));
                return;
            }

            if (parameters['tail'] !== undefined) {
                queryParameters['tail'] = parameters['tail'];
            }

            if (parameters['line'] !== undefined) {
                queryParameters['line'] = parameters['line'];
            }

            if (parameters['limit'] !== undefined) {
                queryParameters['limit'] = parameters['limit'];
            }

            if (parameters['json'] !== undefined) {
                queryParameters['json'] = parameters['json'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Destroy artifact files of the job with the given id
     * @method
     * @name PaperspaceApi#JobsArtifactsDestroy
     * @param {string} jobId - The id of the job to destroy artifacts for
     * @param {} files - Optional; if destroying only certain files, a wildcard pattern to match against, e.g., "myfiles*".  Note: if you include a wildcard you must double-quote the files argument.
     */
    JobsArtifactsDestroy(parameters: {
        'jobId': string,
        'files' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/jobs/{jobId}/artifactsDestroy';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{jobId}', `${parameters['jobId']}`);

            if (parameters['jobId'] === undefined) {
                reject(new Error('Missing required  parameter: jobId'));
                return;
            }

            if (parameters['files'] !== undefined) {
                body = parameters['files'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Clone an exiting job and queue the cloned copy to run
     * @method
     * @name PaperspaceApi#JobsClone
     * @param {string} jobId - Id of the job to clone
     */
    JobsClone(parameters: {
        'jobId': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < JobsClone >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/jobs/{jobId}/clone';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{jobId}', `${parameters['jobId']}`);

            if (parameters['jobId'] === undefined) {
                reject(new Error('Missing required  parameter: jobId'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Destroy the job with the given id
     * @method
     * @name PaperspaceApi#JobsDestroy
     * @param {string} jobId - The id of the job to destroy
     */
    JobsDestroy(parameters: {
        'jobId': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/jobs/{jobId}/destroy';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{jobId}', `${parameters['jobId']}`);

            if (parameters['jobId'] === undefined) {
                reject(new Error('Missing required  parameter: jobId'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Stop an individual job
     * @method
     * @name PaperspaceApi#JobsStop
     * @param {string} jobId - Id of the job to shut down
     */
    JobsStop(parameters: {
        'jobId': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/jobs/{jobId}/stop';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{jobId}', `${parameters['jobId']}`);

            if (parameters['jobId'] === undefined) {
                reject(new Error('Missing required  parameter: jobId'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
    * Create a new Paperspace virtual machine
    * @method
    * @name PaperspaceApi#MachinesCreate
         * @param {} region - Name of the region: either 'East Coast (NY2)', 'West Coast (CA1)', or 'Europe (AMS1)'
         * @param {} machineType - Machine type: either 'Air', 'Standard', 'Pro', 'Advanced', 'GPU+', 'P4000', 'P5000', 'P6000', 'V100', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', or 'C10'<p>
    Note:<br>
    Windows os templates cannot be used to create CPU-only machine types 'C1' - 'C10'.<br>
    Ubuntu os templates cannot be used to create GRID GPU machine types: 'Air', 'Standard', 'Pro', or 'Advanced'.
         * @param {} size - Storage size for the machine in GB
         * @param {} billingType - Either 'monthly' or 'hourly' billing
         * @param {} machineName - A memorable name for this machine
         * @param {} templateId - Template id of the template to use for creating this machine
         * @param {} assignPublicIp - Assign a new public ip address on machine creation. Cannot be used with dynamicPublicIp.
         * @param {} dynamicPublicIp - Assigns a new public ip address on machine start and releases it from the account on machine stop. Cannot be used with assignPublicIp.
         * @param {} networkId - If creating on a specific network, specify its id
         * @param {} teamId - If creating the machine for a team, specify the team id
         * @param {} userId - If assigning to an existing user other than yourself, specify the user id (mutually exclusive with email, password, firstName, lastName)
         * @param {} email - If creating a new user for this machine, specify their email address (mutually exclusive with userId)
         * @param {} password - If creating a new user, specify their password (mutually exclusive with userId)
         * @param {} firstName - If creating a new user, specify their first name (mutually exclusive with userId)
         * @param {} lastName - If creating a new user, specify their last name (mutually exclusive with userId)
         * @param {} notificationEmail - Send a notification to this email address when complete
         * @param {} scriptId - The script id of a script to be run on startup.  See the [Script Guide]{@link https://paperspace.github.io/paperspace-node/scripts.md} for more info on using scripts.
    */
    MachinesCreate(parameters: {
        'region': string,
        'machineType': string,
        'size': number,
        'billingType': string,
        'machineName': string,
        'templateId': string,
        'assignPublicIp' ? : boolean,
        'dynamicPublicIp' ? : boolean,
        'networkId' ? : string,
        'teamId' ? : string,
        'userId' ? : string,
        'email' ? : string,
        'password' ? : string,
        'firstName' ? : string,
        'lastName' ? : string,
        'notificationEmail' ? : string,
        'scriptId' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/machines/createSingleMachinePublic';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['region'] !== undefined) {
                body = parameters['region'];
            }

            if (parameters['region'] === undefined) {
                reject(new Error('Missing required  parameter: region'));
                return;
            }

            if (parameters['machineType'] !== undefined) {
                body = parameters['machineType'];
            }

            if (parameters['machineType'] === undefined) {
                reject(new Error('Missing required  parameter: machineType'));
                return;
            }

            if (parameters['size'] !== undefined) {
                body = parameters['size'];
            }

            if (parameters['size'] === undefined) {
                reject(new Error('Missing required  parameter: size'));
                return;
            }

            if (parameters['billingType'] !== undefined) {
                body = parameters['billingType'];
            }

            if (parameters['billingType'] === undefined) {
                reject(new Error('Missing required  parameter: billingType'));
                return;
            }

            if (parameters['machineName'] !== undefined) {
                body = parameters['machineName'];
            }

            if (parameters['machineName'] === undefined) {
                reject(new Error('Missing required  parameter: machineName'));
                return;
            }

            if (parameters['templateId'] !== undefined) {
                body = parameters['templateId'];
            }

            if (parameters['templateId'] === undefined) {
                reject(new Error('Missing required  parameter: templateId'));
                return;
            }

            if (parameters['assignPublicIp'] !== undefined) {
                body = parameters['assignPublicIp'];
            }

            if (parameters['dynamicPublicIp'] !== undefined) {
                body = parameters['dynamicPublicIp'];
            }

            if (parameters['networkId'] !== undefined) {
                body = parameters['networkId'];
            }

            if (parameters['teamId'] !== undefined) {
                body = parameters['teamId'];
            }

            if (parameters['userId'] !== undefined) {
                body = parameters['userId'];
            }

            if (parameters['email'] !== undefined) {
                body = parameters['email'];
            }

            if (parameters['password'] !== undefined) {
                body = parameters['password'];
            }

            if (parameters['firstName'] !== undefined) {
                body = parameters['firstName'];
            }

            if (parameters['lastName'] !== undefined) {
                body = parameters['lastName'];
            }

            if (parameters['notificationEmail'] !== undefined) {
                body = parameters['notificationEmail'];
            }

            if (parameters['scriptId'] !== undefined) {
                body = parameters['scriptId'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Get machine availability for the given region and machine type
     * @method
     * @name PaperspaceApi#MachinesAvailability
     * @param {string} region - Name of the region: either 'East Coast (NY2)', 'West Coast (CA1)', or 'Europe (AMS1)'
     * @param {string} machineType - Machine type: either 'GPU+', 'P4000', 'P5000', 'P6000', or 'V100'<p>
     */
    MachinesAvailability(parameters: {
        'region': string,
        'machineType': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < MachinesAvailability >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/machines/getAvailability';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['region'] !== undefined) {
                queryParameters['region'] = parameters['region'];
            }

            if (parameters['region'] === undefined) {
                reject(new Error('Missing required  parameter: region'));
                return;
            }

            if (parameters['machineType'] !== undefined) {
                queryParameters['machineType'] = parameters['machineType'];
            }

            if (parameters['machineType'] === undefined) {
                reject(new Error('Missing required  parameter: machineType'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Wait for the machine with the given id to enter a certain machine state
     * @method
     * @name PaperspaceApi#MachinesWaitfor
     * @param {string} machineId - Id of the machine to wait for
     * @param {string} state - Name of the state to wait for, either 'off', 'serviceready', 'ready'
     */
    MachinesWaitfor(parameters: {
        'machineId': string,
        'state': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < MachinesWaitfor >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/machines/getMachinePublic';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['machineId'] !== undefined) {
                queryParameters['machineId'] = parameters['machineId'];
            }

            if (parameters['machineId'] === undefined) {
                reject(new Error('Missing required  parameter: machineId'));
                return;
            }

            if (parameters['state'] !== undefined) {
                queryParameters['state'] = parameters['state'];
            }

            if (parameters['state'] === undefined) {
                reject(new Error('Missing required  parameter: state'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * List information about all machines available to either the current authenticated user or the team, if the user belongs to a team
     * @method
     * @name PaperspaceApi#MachinesList
     */
    MachinesList(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < MachinesList >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/machines/getMachines';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Get machine utilization data for the machine with the given id
     * @method
     * @name PaperspaceApi#MachinesUtilization
     * @param {string} machineId - Id of the machine to get utilization data for
     * @param {string} billingMonth - Billing period to query in `YYYY-MM` format
     */
    MachinesUtilization(parameters: {
        'machineId': string,
        'billingMonth': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < MachinesUtilization >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/machines/getUtilization';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['machineId'] !== undefined) {
                queryParameters['machineId'] = parameters['machineId'];
            }

            if (parameters['machineId'] === undefined) {
                reject(new Error('Missing required  parameter: machineId'));
                return;
            }

            if (parameters['billingMonth'] !== undefined) {
                queryParameters['billingMonth'] = parameters['billingMonth'];
            }

            if (parameters['billingMonth'] === undefined) {
                reject(new Error('Missing required  parameter: billingMonth'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Destroy the machine with the given id
     * @method
     * @name PaperspaceApi#MachinesDestroy
     * @param {string} machineId - The id of the machine to destroy
     * @param {} releasePublicIp - releases any assigned public ip address for the machine; defaults to false
     */
    MachinesDestroy(parameters: {
        'machineId': string,
        'releasePublicIp' ? : boolean,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/machines/{machineId}/destroyMachine';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{machineId}', `${parameters['machineId']}`);

            if (parameters['machineId'] === undefined) {
                reject(new Error('Missing required  parameter: machineId'));
                return;
            }

            if (parameters['releasePublicIp'] !== undefined) {
                body = parameters['releasePublicIp'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Restart an individual machine
     * @method
     * @name PaperspaceApi#MachinesRestart
     * @param {string} machineId - Id of the machine to restart
     */
    MachinesRestart(parameters: {
        'machineId': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/machines/{machineId}/restart';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{machineId}', `${parameters['machineId']}`);

            if (parameters['machineId'] === undefined) {
                reject(new Error('Missing required  parameter: machineId'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Start up an individual machine
     * @method
     * @name PaperspaceApi#MachinesStart
     * @param {string} machineId - Id of the machine to start
     */
    MachinesStart(parameters: {
        'machineId': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/machines/{machineId}/start';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{machineId}', `${parameters['machineId']}`);

            if (parameters['machineId'] === undefined) {
                reject(new Error('Missing required  parameter: machineId'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Stop an individual machine
     * @method
     * @name PaperspaceApi#MachinesStop
     * @param {string} machineId - Id of the machine to shut down
     */
    MachinesStop(parameters: {
        'machineId': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/machines/{machineId}/stop';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{machineId}', `${parameters['machineId']}`);

            if (parameters['machineId'] === undefined) {
                reject(new Error('Missing required  parameter: machineId'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Update attributes of a machine
     * @method
     * @name PaperspaceApi#MachinesUpdate
     * @param {string} machineId - Id of the machine to update
     * @param {} machineName - New name for the machine
     * @param {} shutdownTimeoutInHours - Number of hours before machine is shutdown if no one is logged in via the Paperspace client
     * @param {} shutdownTimeoutForces - Force shutdown at shutdown timeout, even if there is a Paperspace client connection
     * @param {} autoSnapshotFrequency - One of 'hour', 'day', 'week', or null
     * @param {} autoSnapshotSaveCount - Number of snapshots to save
     * @param {} performAutoSnapshot - Perform auto snapshots
     * @param {} dynamicPublicIp - If true, assigns a new public ip address on machine start and releases it from the account on machine stop
     */
    MachinesUpdate(parameters: {
        'machineId': string,
        'machineName' ? : string,
        'shutdownTimeoutInHours' ? : number,
        'shutdownTimeoutForces' ? : boolean,
        'autoSnapshotFrequency' ? : number,
        'autoSnapshotSaveCount' ? : number,
        'performAutoSnapshot' ? : boolean,
        'dynamicPublicIp' ? : boolean,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/machines/{machineId}/updateMachinePublic';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{machineId}', `${parameters['machineId']}`);

            if (parameters['machineId'] === undefined) {
                reject(new Error('Missing required  parameter: machineId'));
                return;
            }

            if (parameters['machineName'] !== undefined) {
                body = parameters['machineName'];
            }

            if (parameters['shutdownTimeoutInHours'] !== undefined) {
                body = parameters['shutdownTimeoutInHours'];
            }

            if (parameters['shutdownTimeoutForces'] !== undefined) {
                body = parameters['shutdownTimeoutForces'];
            }

            if (parameters['autoSnapshotFrequency'] !== undefined) {
                body = parameters['autoSnapshotFrequency'];
            }

            if (parameters['autoSnapshotSaveCount'] !== undefined) {
                body = parameters['autoSnapshotSaveCount'];
            }

            if (parameters['performAutoSnapshot'] !== undefined) {
                body = parameters['performAutoSnapshot'];
            }

            if (parameters['dynamicPublicIp'] !== undefined) {
                body = parameters['dynamicPublicIp'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * List information about all networks available to either the current authenticated user or the team, if the user belongs to a team
     * @method
     * @name PaperspaceApi#NetworksList
     */
    NetworksList(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < NetworksList >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/networks/getNetworks';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Creates a new startup script
     * @method
     * @name PaperspaceApi#ScriptsCreate
     * @param {} scriptName - A unique name for the script
     * @param {} scriptFile - File path to a file containing the script data; either scriptFile or scriptText must be provide.
     * @param {} scriptText - A string containing the script text; either scriptFile or scriptText must be provide.
     * @param {} scriptDescription - Description of the script
     * @param {} isEnabled - Determines if the script is enabled or not.  Defaults to true
     * @param {} runOnce - Determines if the script is run on first boot or every boot.  Defaults to false
     * @param {} machineId - Machine id of a machine that should execute this script at startup
     */
    ScriptsCreate(parameters: {
        'scriptName': string,
        'scriptFile' ? : string,
        'scriptText' ? : string,
        'scriptDescription' ? : string,
        'isEnabled' ? : boolean,
        'runOnce' ? : boolean,
        'machineId' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < ScriptsCreate >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/scripts/createScript';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['scriptName'] !== undefined) {
                body = parameters['scriptName'];
            }

            if (parameters['scriptName'] === undefined) {
                reject(new Error('Missing required  parameter: scriptName'));
                return;
            }

            if (parameters['scriptFile'] !== undefined) {
                body = parameters['scriptFile'];
            }

            if (parameters['scriptText'] !== undefined) {
                body = parameters['scriptText'];
            }

            if (parameters['scriptDescription'] !== undefined) {
                body = parameters['scriptDescription'];
            }

            if (parameters['isEnabled'] !== undefined) {
                body = parameters['isEnabled'];
            }

            if (parameters['runOnce'] !== undefined) {
                body = parameters['runOnce'];
            }

            if (parameters['machineId'] !== undefined) {
                body = parameters['machineId'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Show information for the script with the given id, except for the script text
     * @method
     * @name PaperspaceApi#ScriptsShow
     * @param {string} scriptId - Id of the script to show
     */
    ScriptsShow(parameters: {
        'scriptId': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < ScriptsShow >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/scripts/getScript';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['scriptId'] !== undefined) {
                queryParameters['scriptId'] = parameters['scriptId'];
            }

            if (parameters['scriptId'] === undefined) {
                reject(new Error('Missing required  parameter: scriptId'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Gets the text of the script with the given id
     * @method
     * @name PaperspaceApi#ScriptsText
     * @param {string} scriptId - Id of the script to get text for
     */
    ScriptsText(parameters: {
        'scriptId': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < ScriptsText >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/scripts/getScriptText';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['scriptId'] !== undefined) {
                queryParameters['scriptId'] = parameters['scriptId'];
            }

            if (parameters['scriptId'] === undefined) {
                reject(new Error('Missing required  parameter: scriptId'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * List information about all scripts assigned to either the current authenticated user or the team, if the user belongs to a team
     * @method
     * @name PaperspaceApi#ScriptsList
     */
    ScriptsList(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < ScriptsList >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/scripts/getScripts';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * Destroys the starup script with the given id
     * @method
     * @name PaperspaceApi#ScriptsDestroy
     * @param {string} scriptId - The id of the script to destroy
     */
    ScriptsDestroy(parameters: {
        'scriptId': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < void >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/scripts/{scriptId}/destroy';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{scriptId}', `${parameters['scriptId']}`);

            if (parameters['scriptId'] === undefined) {
                reject(new Error('Missing required  parameter: scriptId'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * List information about all templates available to either the current authenticated user or the team, if the user belongs to a team
     * @method
     * @name PaperspaceApi#TemplatesList
     */
    TemplatesList(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < TemplatesList >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/templates/getTemplates';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    /**
     * List information about all users available to either the current authenticated user or the team, if the user belongs to a team
     * @method
     * @name PaperspaceApi#UsersList
     */
    UsersList(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < ResponseWithBody < UsersList >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/users/getUsers';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

}

export default PaperspaceApi;