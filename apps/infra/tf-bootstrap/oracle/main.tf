terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
  required_version = ">= 1.0.0"
  required_providers {
    oci = {
      source  = "oracle/oci"
      version = ">= 8.0.0"
    }
  }
}

provider "oci" {
  config_file_profile = var.config_file_profile
}

resource "oci_identity_compartment" "tf_compartment" {
  compartment_id = var.root_compartment_id
  description    = "Compartment to manage Terraform resources"
  name           = "tf-compartment"
}

resource "oci_objectstorage_bucket" "terraform_state_bucket" {
  compartment_id = oci_identity_compartment.tf_compartment.id
  name           = "hs-tf-state"
  namespace      = var.object_storage_namespace
}
