
import os


# This script launches both parts of the system: Node App and Mongo DB
def main(): 
	# First builds docker images. In this case, mongo and node dockers
	build_image("mongo", "mongo/mongodb")
	build_image("app", "app/nodeapp")
	
	# Creates the required docker network inside the host to connect both containers easily
	network_name = "mynet"
	create_network(network_name)

	# Launches the containers
	launch_service("mongo/mongodb", "8081", network_name, "mongoDocker")
	launch_service("app/nodeapp", "8080", network_name, "nodeapp")


# Executes individual services from Dockerfile's path
def build_image(path, image_name):
	os.system("pwd")
	os.chdir(path)
	os.system("sudo docker build -t " + image_name + " .")
	os.chdir(os.path.dirname(os.getcwd()))


# Launches services from the image's name
def launch_service(image_name, port, network_name, container_name):
	os.system("sudo docker run -p " + port + ":" + port + " --name " + 
		container_name + " --net " + network_name + " " + image_name + " &")


# Function used to create the docker network
def create_network(network_name):
	os.system("sudo docker network create " + network_name)


main()
