resource "oci_identity_compartment" "tf_compartment" {
  provider       = oci
  compartment_id = var.root_compartment_id
  description    = "Compartment to manage Terraform resources"
  name           = "tf-compartment"
}

resource "oci_objectstorage_bucket" "terraform_state_bucket" {
  provider       = oci
  compartment_id = oci_identity_compartment.tf_compartment.id
  name           = "hs-tf-state"
  namespace      = var.object_storage_namespace
}
