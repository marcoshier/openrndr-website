<template>
  <div v-if="landing">
    <!-- BEGIN Video background -->
    <header v-if="landing.banner.media" class="">
      <video-background v-if="landing.banner.media[0].__typename == 'VideoRecord'" :source="landing.banner.media[0].file.provider" :vidId="landing.banner.media[0].file.providerUid" />
      <div v-else>
      </div>
    </header>
    <!-- END Video background -->
    <div class="container p-4 border-left border-right border-primary">
    </div>
    <!-- BEGIN Getting started -->
    <section v-if="landing.gettingStarted[0]" class="content-block border-top border-primary">
        <div class="container py-5 border-left border-right border-primary" :id="landing.gettingStarted[0].anchorpoint ? landing.gettingStarted[0].anchorpoint : ''">
          <h1 v-if="landing.gettingStarted[0].title">
            {{landing.gettingStarted[0].title}}
          </h1>

          <p v-if="landing.gettingStarted[0].subtext">
            {{landing.gettingStarted[0].subtext}}
          </p>

          <template v-if="landing.gettingStarted[0].bodyText">
            <div v-html="landing.gettingStarted[0].bodyText">
            </div>
          </template>

          <hr class="my-5">

          <div v-if="landing.gettingStartedButtons" class="d-flex justify-content-between">
            <template v-for="(button, index) in landing.gettingStartedButtons">
              <nuxt-link :to="button.link" :key="index" class="btn btn-lg btn-primary getting-started-link">
                {{ button.title }}
              </nuxt-link>
              <img v-if="index < landing.gettingStartedButtons.length -1" src="@/assets/images/arrow.svg" alt="Next step indicator" class="arrow-next">
            </template>
          </div>
        </div>
    </section>
    <!-- END Getting started -->

    <!-- BEGIN Key features -->
    <section class="content-block">
      <content-block v-if="landing.keyFeaturesText[0]"
      :initTitle="landing.keyFeaturesText[0].title" :initSubtext="landing.keyFeaturesText[0].subtext" :initBodyText="landing.keyFeaturesText[0].bodyText" :initAnchorpoint="landing.keyFeaturesText[0].anchorpoint" :initIndex="1" />

      <div v-if="landing.keyFeaturesText && landing.keyFeatures" class="container border-left border-right border-primary">
        <hr class="my-0">
      </div>

      <div class="container py-5 border-left border-right border-primary" v-if="landing.keyFeatures">
        <div class="row">
          <key-feature v-for="(feature, index) in landing.keyFeatures" :title="feature.title" :description="feature.description" :index="index" :key="index" />
        </div>
      </div>
    </section>
    <!-- END Key features -->

    <!-- BEGIN Ecosystem -->
    <section class="content-block">
      <content-block v-if="landing.ecosystemText[0]"
      :initTitle="landing.ecosystemText[0].title" :initSubtext="landing.ecosystemText[0].subtext" :initBodyText="landing.ecosystemText[0].bodyText" :initAnchorpoint="landing.ecosystemText[0].anchorpoint" :initIndex="2" />

      <div v-if="landing.ecosystemText && landing.ecosystem" class="container border-left border-right border-primary">
        <hr class="my-0">
      </div>

      <div class="container py-5 border-left border-right border-primary" v-if="landing.ecosystem">
        <div class="row">
          <eco-item v-for="(item, index) in landing.ecosystem" :title="item.title" :image="item.image" :key="index" />
        </div>
      </div>
    </section>
    <!-- END Ecosystem -->

    <!-- BEGIN FaQ -->
    <section class="content-block">
      <content-block v-if="landing.faqText[0]"
      :initTitle="landing.faqText[0].title" :initSubtext="landing.faqText[0].subtext" :initBodyText="landing.faqText[0].bodyText" :initAnchorpoint="landing.faqText[0].anchorpoint" :initIndex="3" />

      <div v-if="landing.faqText[0] && landing.faq[0]" class="container border-left border-right border-primary">
        <hr class="my-0">
      </div>

      <div class="container py-5 border-left border-right border-primary" v-if="landing.faq[0]">
        <faq :faq="landing.faq" />
      </div>
    </section>
    <!-- END FaQ -->
  </div>

  <div v-else>
    Error
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import VideoBackground from '~/components/VideoBackground.vue'
  import ContentBlock from '~/components/ContentBlock.vue'
  import KeyFeature from '~/components/KeyFeature.vue'
  import EcoItem from '~/components/EcoItem.vue'
  import Faq from '~/components/Faq.vue'

  export default {
    layout: 'home',
    components: {
      VideoBackground,
      ContentBlock,
      KeyFeature,
      EcoItem,
      Faq
    },
    apollo: {
      landing: gql`{
        landing {
          banner {
            media {
              ... on VideoRecord {
                id
                file {
                  height
                  provider
                  providerUid
                  thumbnailUrl
                  title
                  url
                  width
                }
              }
            }
          }
          gettingStarted {
            bodyText
            title
            subtext
            anchorpoint
          }
          gettingStartedButtons {
            link
            title
          }
          keyFeaturesText {
            bodyText
            subtext
            title
            anchorpoint
          }
          keyFeatures {
            title
            description
          }
          ecosystemText {
            bodyText
            subtext
            title
            anchorpoint
          }
          ecosystem {
            title
            link
            image {
              url
            }
          }
          faqText {
            bodyText
            subtext
            title
            anchorpoint
          }
          faq {
            question
            answer
          }
        }
      }`
    },
    data: function() {
      return {
        isKeyFeature: false,
        isEcosystem: false,
        isFaq: false
      }
    },
    mounted() {
    }
  }
</script>

<style>
  .getting-started-link {
    font-size: 22px;
    min-width: 330px;
    padding-top: 12px;
    padding-bottom: 12px;
   }

  .arrow-next {
    width: 40px;
    height: 59px;
  }

  @media only screen and (max-width: 1199px) {
    .arrow-next {
      height: 50px;
      width: 30px;
    }

    .getting-started-link {
      font-size: 20px;
      min-width: 260px;
      padding-top: 8px;
      padding-bottom: 8px;
     }
  }

  @media only screen and (max-width: 991px) {
    .arrow-next {
      height: 43px;
      width: 30px;
    }

    .getting-started-link {
      font-size: 17px;
      min-width: 150px;
      padding-top: 8px;
      padding-bottom: 8px;
     }
  }
</style>
