export default (url: string) => {
  const urlSplit = url.split('/');
  return urlSplit[urlSplit.length - 2];
}