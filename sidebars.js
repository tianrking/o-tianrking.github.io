/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'tutorial',
      label: 'Tutorial',
    },
    {
      type: 'category',
      label: 'Micro-Controladores',
      items: [
        {
          type: 'category',
          label: 'STM32',
          items: [
            'micro-controladores/STM32/stm32_cdc_develop'
          ]
        },
        {
            type: 'category',
            label: 'ESP32',
            items: [
              {
                type: 'link',
                label: ' ',
                href: '#'
              }
            ]
        },
        {
            type: 'category',
            label: 'RP2040',
            items: [
              {
                type: 'link',
                label: ' ',
                href: '#'
              },
              'micro-controladores/RP2040/mastering-pio-programming',
              'micro-controladores/RP2040/pio-uart-implementation',
              'micro-controladores/RP2040/advanced-pio-led-control-and-resource-management'
            ]
        }
      ]
    }
  ]
   
};

export default sidebars;
