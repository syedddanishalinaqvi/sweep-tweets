/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['res.cloudinary.com']
    },
    env:{
        WEBSITE:process.env.WEBSITE
    }
}

module.exports = nextConfig
