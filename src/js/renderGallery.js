export const renderGallery = images => {
  const markupGallery = images
    .map(image => {
      return `
<a class="photo-card" href="${image.largeImageURL}">
<img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
<div class="info">
<p class="info-item">
<b>Likes</b> ${image.likes}
</p>
<p class="info-item">
<b>Views</b> ${image.views}
</p>
<b>Comments</b> ${image.comments}
</p>
<p class="info-item">
 <b>Downloads</b> ${image.downloads}
</p>
</div>
</a>`;
    })
    .join('');

  return markupGallery;
};
