resource "oci_identity_compartment" "k8s_compartment" {
  provider       = oci
  compartment_id = var.root_compartment_id
  description    = "Compartment to manage Terraform resources"
  name           = "k8s-compartment"
}

resource "tls_private_key" "key" {
  algorithm = "RSA"
  rsa_bits  = "4096"
}

resource "local_file" "ssh_private_key" {
  content         = tls_private_key.key.private_key_pem
  filename        = "${abspath(path.root)}/id_rsa"
  file_permission = "0600"
}

resource "local_file" "ssh_public_key" {
  content         = tls_private_key.key.public_key_openssh
  filename        = "${abspath(path.root)}/id_rsa.pub"
  file_permission = "0600"
}

module "oke" {
  source     = "oracle-terraform-modules/oke/oci"
  version    = "5.3.3"
  depends_on = [oci_identity_compartment.k8s_compartment]

  providers = {
    oci.home = oci
  }

  region = var.region

  # ssh keys
  ssh_private_key      = local_file.ssh_private_key.content
  ssh_private_key_path = local_file.ssh_private_key.filename
  ssh_public_key       = local_file.ssh_public_key.content
  ssh_public_key_path  = local_file.ssh_public_key.filename

  # general oci parameters
  compartment_id = oci_identity_compartment.k8s_compartment.id

  # networking
  create_vcn = true

  # TODO: Temporary skipping
  create_bastion = false

  # operator host
  create_operator = false

  # oke cluster options
  cluster_name = var.k8s_cluster_name
  # control_plane_allowed_cidrs = var.control_plane_allowed_cidrs
  kubernetes_version = var.k8s_version
  cluster_type       = "basic"

  # oke load balancers
  load_balancers          = "both"
  preferred_load_balancer = "public"
}
