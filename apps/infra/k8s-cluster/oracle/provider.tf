terraform {
  backend "oci" {
    bucket = "hs-tf-state"
    key    = "terraform.tfstate"
  }
  required_version = ">= 1.0.0"
  required_providers {
    oci = {
      source  = "oracle/oci"
      version = ">= 8.0.0"
    }
  }
}

provider "oci" {}
