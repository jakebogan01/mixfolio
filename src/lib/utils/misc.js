export function processExpandedItems(pb, items = [], fileField = 'image', urlField = 'image_url') {
	return items.map((item) => {
		item[urlField] = item[fileField] ? pb.files.getURL(item, item[fileField]) : null;
		if ('collectionId' in item) delete item.collectionId;
		return item;
	});
}
