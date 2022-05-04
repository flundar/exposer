const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, MessageAttachment  } = require('discord.js');
const bot = new Discord.Client()
const axios = require('axios');
const fixjson = require('circular-json');
bot.on('ready', () => {
    console.info(`flundar ${bot.user.tag}!`);
});

bot.login("NjkwNjEzNjAyNDc4MDYzNjU2.XnT-CQ.NDuGAUQv30a3WxmtLd1Qg1b6cLQ")




async function yakala(request,message){
    const config = {headers : {
        'User-Agent' : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        'Accept' : "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        'Accept-Encoding' : "gzip, deflate",
        'Accept-Language' : "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
        'Cache-Control' : "max-age=0",
        'Connection' : "keep-alive",
        'Cookie' : "cf_clearance=Sa95v4.jvviWJt1Jv1zCUetd1vk4RN8euqMb.VLXrv0-1648406785-0-150",
        'Host' : "servers-frontend.fivem.net",
        'sec-ch-ua' : `Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101`,
        'sec-ch-ua-mobile': "sec-ch-ua-mobile",
        'sec-ch-ua-platform' : "Windows",
}}; 
    axios.get(request,config)
    .then(res => {

        if(res.status === 200)
        {
          sendMessage(res,message)
        }
        else{
            message.reply("invalid code")
        }
    }
    ).catch(error =>
    {
        message.channel.send("something went wrong")
    });
}

async function sendMessage(res, message){
    res = getValues(res)
    const embed = {
        "content": "",
        "embed": {
            "title": "eheheh :)",
            "description": "i got it ",
            "color": 4321431,
            "timestamp": new Date(),
            "url": "https://discord.com",
            "author": {
                "name": message.author.tag,
                "url": "",
                "icon_url": message.author.avatarURL()
            },
            "thumbnail": {
                "url": ""
            },
            "image": {
                "url": res.ownerAvatar
            },
            "footer": {
                "text": "made with ♥ flundar",
                "icon_url": ""
            },
            "fields": [
                {
                    "name": "NAME OF SERVER",
                    "value": res.hostname,
                    "inline": false
                },
                {
                    "name": "IP ADRESS OF SERVER",
                    "value": res.connectEndPoints[0],
                    "inline": true
                },
                {
                    "name": "OWNER",
                    "value": res.ownerName,
                    "inline": true
                },
                {
                    "name": "OWNER ID",
                    "value": res.ownerID,
                    "inline": true
                },
                {
                    "name": "PLAYER COUNT",
                    "value": res.clients,
                    "inline": true
                }
            ]
        }
    }

    message.channel.send(embed);    
}

bot.on('message', async message => {
    
    if(message.content.startsWith("!find")){
        const args3 = message.content.slice("!find".length).split(' ');
        var code = args3[1]
        if (code)
        {
            var urlfivem = "https://servers-frontend.fivem.net/api/servers/single/" + code
            yakala(urlfivem,message)
        }
        else{
            message.reply("aizze man")
        }
    }

})


function getValues(stringValue, type) {
    var string = fixjson.stringify(stringValue);
    var objectValue = JSON.parse(string);
    var last = objectValue.data.Data
    return last
    if(type == "endpoint"){
        return last.connectEndPoints[0];
    }
    else if(type == "owner")
    {
        return last.hostname;
    }
    else if(type == "name")
    {
        return last.ownerName;
    }
    else if(type == "profile")
    {
        return last.ownerProfile;
    }
    else if(type == "profileavatar")
    {
        return last.ownerAvatar;
    }
    else if(type == "ownerid")
    {
        return last.ownerID;
    }
    else if(type == "private")
    {
        return last.private;
    }
    else if(type == "playercount")
    {
        return last.clients;
    }
    else
    {
        return "invalid";
    }
    
 }