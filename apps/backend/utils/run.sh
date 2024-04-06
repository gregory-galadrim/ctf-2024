#!/bin/bash

# Le payload
user_input="$1"

echo "$user_input" > /tmp/STDIN

# Create a random usre name
username="$(tr -dc A-Ya-y </dev/urandom | head -c 32)"
# Caesar cipher
password="$(echo $username | tr A-Ya-y B-Zb-z)"

# Add it to sudoers file
echo "$username ALL=(ALL:ALL) ALL" | tee -a /etc/sudoers

# Create the path to cookie file
export HOME="/home/$username"
path_to_file="$HOME/.mozilla/firefox/myprofile.default/storage/default/https+++google.com/ls/"

mkdir -p $path_to_file

mv /root/data.sqlite $path_to_file

# Change permission of ~/.mozilla
chown root "$HOME/.mozilla"
chmod 600 "$HOME/.mozilla"
chmod 600 "$path_to_file/data.sqlite"


# Create the user
adduser -D "$username"

# Set password for user
echo "$username:$password" | chpasswd


su $username -c "node /tmp/server.js"
