ansible-playbook deploy-docker-images-app.yml -i inventory_CPU.yml
ansible-playbook update-k8s-cluster_CPU.yml -i inventory-CPU.yml