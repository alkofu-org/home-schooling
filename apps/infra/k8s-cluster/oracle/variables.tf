variable "root_compartment_id" {
  type = string
}

variable "k8s_cluster_name" {
  type = string
}

variable "k8s_version" {
  type = string
}

variable "k8s_worker_nodes" {
  description = "Worker node count"
  type        = number
  default     = 2
}

variable "region" {
  type = string
}
