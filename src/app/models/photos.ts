export interface Photos {
  name: string;
  imgURL: string;
  imgAlt: string;
}
export const allPhotos: Photos[] = [
  {
    name: 'Mia showing her teeth',
    imgURL: '../../assets/images/about-me/cards/mia-0.webp',
    imgAlt: 'My cat showing her teeth, scary.',
  },
  {
    name: 'Amora, my dog',
    imgURL: '../../assets/images/about-me/cards/amora.webp',
    imgAlt:
      'My mixed-breed dog, her name is Amora, in Brazil we call cachorro caramelo (caramel dog in english).',
  },
  {
    name: 'Mia, full body',
    imgURL: '../../assets/images/about-me/cards/mia-1.webp',
    imgAlt: `It's Mia again, now it's a full photo, she's a gray cat.`,
  },
  {
    name: 'Felipe Costa',
    imgURL: '../../assets/images/about-me/cards/myself-again.webp',
    imgAlt: `It's me again, now I'm using a bluer t-shirt, smiling to camera.`,
  },
  {
    name: 'Mia and her teddy bear',
    imgURL: '../../assets/images/about-me/cards/mia-2.webp',
    imgAlt: `Oh, It's Mia... Again, yeah, I realy love Mia, in this photo she's sleeping hold her teddy bear.`,
  },
];
