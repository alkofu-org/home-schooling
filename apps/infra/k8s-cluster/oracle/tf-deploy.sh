#!/bin/bash

set -e

terraform init

export $(cat .env | xargs -I % echo TF_VAR_%)

terraform plan -out bootstrap.tfplan

terraform apply bootstrap.tfplan
