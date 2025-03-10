packer {
  required_plugins {
    docker = {
      version = ">= 0.0.7"
      source  = "github.com/hashicorp/docker"
    }
  }
}

source "docker" "nginx" {
  image  = "debian:latest"
  commit = true
  changes = [
    "ENTRYPOINT nginx -g 'daemon off;'"
  ]
}

build {
  sources = [
    "source.docker.nginx",
  ]

  provisioner "shell" {
    inline = [
      "apt update && apt install -y nginx",
    ]
  }

  post-processor "docker-tag" {
    repository = "${var.image_name}"
    tags       = ["${var.image_tag}"]
  }

  post-processor "shell-local" {
    inline = [
      "docker pull quay.io/deepfenceio/deepfence_secret_scanner_ce:2.5.2",
      "docker run -i --rm --net=host --privileged=true --cpus=\"0.3\" -v /var/run/docker.sock:/var/run/docker.sock:rw quay.io/deepfenceio/deepfence_secret_scanner_ce:2.5.2 -product=${var.deepfence_product} -license=${var.deepfence_license} -image-name ${var.image_name}:${var.image_tag} -fail-on-count=${var.FAIL_SECRET_COUNT} -fail-on-high-count=${var.FAIL_HIGH_SECRET_COUNT} -fail-on-medium-count=${var.FAIL_MEDIUM_SECRET_COUNT} -fail-on-low-count=${var.FAIL_LOW_SECRET_COUNT}"
    ]
  }
}
