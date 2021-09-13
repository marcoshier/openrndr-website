// import dynamicRoutes from '~plugins/dynamicRoutes.js'
import 'cross-fetch/polyfill'
import { createHttpLink } from "apollo-link-http"
import { execute, makePromise } from 'apollo-link'
import gql from 'graphql-tag'

export default {
    target: 'static', // default is 'server'
    server: {
        port: 8000,
        host: '0.0.0.0'
    },
    devtools: true,
    generate: {
        routes: async(callback) => {
            // 1. Get the list of posts
            const uri = process.env.ENDPOINT
            const link = new createHttpLink({ uri: uri, fetch: fetch })
            const operation = {
                query: gql `
          {
              allPages {
                  slug
              }
              allPageChildren {
                parentPage {
                  slug
                }
                slug
              }
          }`,
                context: {
                    headers: {
                        authorization: process.env.AUTH_TOKEN
                    }
                }
            }
            console.log('generating routes')
            let data = await makePromise(execute(link, operation))

            // 2. Build the list of routes for Nuxt
            var pageRoutes = [];

            data.data.allPages.forEach(function(item) {
                console.log('routes generated.')
                pageRoutes.push('/' + item.slug)
            })

            data.data.allPageChildren.forEach(function(item) {
                pageRoutes.push('/' + item.parentPage.slug + '/' + item.slug)
            })

            // Register the routes
            callback(null, pageRoutes)
        },
        exclude: [
            '/index (old)'
        ]
    },
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta:[
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
            { name:'application-name', content:'OPENRDR'},
            { name:'msapplication-TileColor', content:'#FFFFFF'},
            { name:'msapplication-TileImage', content:'/mstile-144x144.png'},
            { name:'msapplication-square70x70logo', content:'/mstile-70x70.png'},
            { name:'msapplication-square150x150logo', content:'/mstile-150x150.png'},
            { name:'msapplication-wide310x150logo', content:'/mstile-310x150.png'},
            { name:'msapplication-square310x310logo', content:'/mstile-310x310.png'}
        ],
        link:[
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel:'apple-touch-icon-precomposed', sizes:'57x57', href:'/apple-touch-icon-57x57.png'},
            { rel:'apple-touch-icon-precomposed', sizes:'114x114', href:'/apple-touch-icon-114x114.png'},
            { rel:'apple-touch-icon-precomposed', sizes:'72x72', href:'/apple-touch-icon-72x72.png'},
            { rel:'apple-touch-icon-precomposed', sizes:'144x144', href:'/apple-touch-icon-144x144.png'},
            { rel:'apple-touch-icon-precomposed', sizes:'60x60', href:'/apple-touch-icon-60x60.png'},
            { rel:'apple-touch-icon-precomposed', sizes:'120x120', href:'/apple-touch-icon-120x120.png'},
            { rel:'apple-touch-icon-precomposed', sizes:'76x76', href:'/apple-touch-icon-76x76.png'},
            { rel:'apple-touch-icon-precomposed', sizes:'152x152', href:'/apple-touch-icon-152x152.png'},
            { rel:'icon', type:'image/png', href:'/favicon-196x196.png', sizes:'196x196'},
            { rel:'icon', type:'image/png', href:'/favicon-96x96.png', sizes:'96x96'},
            { rel:'icon', type:'image/png', href:'/favicon-32x32.png', sizes:'32x32'},
            { rel:'icon', type:'image/png', href:'/favicon-16x16.png', sizes:'16x16'},
            { rel:'icon', type:'image/png', href:'/favicon-128.png', sizes:'128x128'}
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: false,
    /*
     ** Global CSS
     */
    css: [
        '@/assets/css/main.scss'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~plugins/vue-gallery.client.js',
        '~plugins/vue-progress.js'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/fontawesome'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/apollo',
    ],
    fontawesome: {
        icons: {
            solid: [
                'faBars',
                'faTimes',
                'faChevronDown',
                'faChevronUp',
                'faCalendarTimes',
                'faCalendarDay',
                'faCalendarAlt',
                'faMapMarkerAlt',
                'faPhoneAlt',
                'faEnvelope',
                'faUser'
            ],
            regular: [
                'faClock'
            ],
            brands: [
                'faInstagram'
            ]
        }
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    apollo: {
        clientConfigs: {
            default: '~/apollo/config.js'
        }
    },
    axios: {},
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
}