# -*- mode: ruby -*-
# vi: set ft=ruby :

# $ rm db_ip.txt | vagrant up | python store_ip.py

Vagrant.configure("2") do |config|
    config.vm.box = 'digital_ocean'
    config.vm.box_url = "https://github.com/devopsgroup-io/vagrant-digitalocean/raw/master/box/digital_ocean.box"
    config.ssh.private_key_path = '~/.ssh/minitwit'
    config.vm.synced_folder ".", "/vagrant", type: "rsync"
  
    config.vm.define "minitwit", primary: true do |server|
      server.vm.provider :digital_ocean do |provider|
        provider.ssh_key_name = ENV["SSH_KEY_NAME"]
        provider.token = ENV["DIGITAL_OCEAN_TOKEN"]
        provider.image = 'ubuntu-18-04-x64'
        provider.region = 'fra1'
        provider.size = 's-1vcpu-1gb'
        provider.privatenetworking = true
      end
  
      server.vm.hostname = "minitwit"

      server.vm.provision "shell", inline: <<-SHELL
        echo "Updating"
        sudo apt update
        sudo apt upgrade

        #copying files to the droplet
        cp -r /vagrant/* $HOME

        #Docker installation

        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

        sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

        apt-cache policy docker-ce

        #there is a bug with this command, you have to run it twice, for some reason it fails the first time
        sudo apt install docker-ce -y

        # install node and npm according to https://github.com/npm/cli/issues/681#issuecomment-846438958
        sudo npm install -g n
        sudo n latest
        hash -d npm

        #remove node_modules if any
        rm -rf node_modules package-lock.json

        #install vue-cli
        sudo npm install -g vue-cli

        docker build -t minitwit_fe .

        docker run -it -p 8080:80 -d --name minitwit_fe minitwit_fe

      SHELL
    end

  end