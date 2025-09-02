// Helper function to format bytes into known file size
export function sizeBytes(bytes){
    if(!bytes && bytes !== 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const k = 1024;
    let i = 0, val = bytes;
    while(val >= k && i < sizes.length - 1){
        val /= k;
        i++;
    }
    return `${val.toFixed(0)} ${sizes[i]}`;
}