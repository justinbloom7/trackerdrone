import socket
import sys

HOST, PORT = '172.20.10.4', 9999

from gpiozero import DistanceSensor
ultrasonic = DistanceSensor(echo=17, trigger=4, max_distance=5)
#ultrasonic.distance

while(True):#data = " ".join(sys.argv[1:])
	data = ultrasonic.distance

	# Create a socket (SOCK_STREAM means a TCP socket
	# with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	# Connect to server and send data
	sock.connect((HOST, PORT))
	#n", "utf-8"))
	sock.sendall(bytes(str(data), "utf-8"))

	# Receive data from the server and shut 
	received = str(sock.recv(1024), "utf-8")
	#print("Sent:     {}".format(print("Received: {}".format(received))
