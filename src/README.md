# Gatekeeper
Gatekeeer is an abstraction layer for StackStorm orchestrator.
It enables sequential proccessing of multiple concurrent request for same infrasturre resource.


##### Exposed APIS
Following API endpoints are exposed by Gatekeeper

1. /v1/requests

Smaple Request
- Do a POST request to this API with following payload
###### Sample Project Create Request Payload
```JSON
{
  "internal_request_id": "MCMP Service X-Request-Id header | string | required",
  "process_name": "MCMP Service Resource ID | string | required |Options: CreateProject, UpdateProject, DeleteProject, RouteCreated, RouteDeleted",
  "payload": {

  }
}

Response:
201 when the request is persisted and sent successfully to the workflow engine
400 if there is a problem with the data
503 if persisting the request failed or failure reaching the orchestration engine



##### Note: Below the dependencies that needs to be added
- go get github.com/go-openapi/errors
- go get github.com/go-openapi/loads
- go get github.com/go-openapi/runtime
- go get github.com/go-openapi/client
- go get github.com/go-openapi/flagext
- go get github.com/go-openapi/middleware
- go get github.com/go-openapi/spec
- go get github.com/go-openapi/strfmt
- go get github.com/go-openapi/swag
- go get github.com/go-openapi/validate
- go get github.com/jessevdk/go-flags

