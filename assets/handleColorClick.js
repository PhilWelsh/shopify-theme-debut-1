  function handleColorClick(variantId){
    
    //get all variables and data-targets from clicked element
    let productId = document.querySelector('[data-variant="' + variantId + '"]').getAttribute('data-productInfo')
    let imageUrl = document.querySelector('[data-variant="' + variantId + '"]').getAttribute('data-productImgUrl')
    
    // variables from data-targets
    let anchor = document.querySelector('[data-product="' + productId + '"] a')  
    let imageTarget = document.querySelector('[data-product="' + productId + '"] img')
    let anchorhref = anchor.href;
    
    //image variables
    let imageTargetSrc = imageTarget.getAttribute('srcSet')
    let imageTargetDataWidths = JSON.parse(imageTarget.getAttribute('data-widths'))
    let variantImgName = (imageUrl.split('.')[0])
    let initialImgUrl= "//cdn.shopify.com/s/files/1/0513/0269/5093/"
    let newImgSrcSet = ""
    
    // dealing with various image file extensions
    let imageFileExtension = ("x." + (imageUrl.split('.')[1]) + " ")
    if (imageFileExtension.includes("png")) {
      imageFileExtension = "x.png ";
    }else if (imageFileExtension.includes("tif")){
      imageFileExtension = "x.tif "
    }
    
    //change link.
	if (anchorhref.includes("?")){
		let baseUrl = anchorhref.split("?")[0]
      	anchor.href = (baseUrl + "?variant=" + variantId)
    } else {
     	anchor.href=(anchorhref + "?variant=" + variantId)
    }
    
    //change image - create array from srcSet
    for (let i=0; i<imageTargetDataWidths.length; i++){
    	newImgSrcSet+= (initialImgUrl + variantImgName + "_" + imageTargetDataWidths[i] + imageFileExtension + imageTargetDataWidths[i] +"w, ");
    } 
    
    imageTarget.srcset = newImgSrcSet
    imageTarget.setAttribute('data-srcset', newImgSrcSet); 
    
    // change alt tag
    imageTarget.setAttribute('alt', variantImgName.split('/')[1])

    //if unavailable
    let captionTarget = document.getElementById("caption-availability-" + productId)
    let productAvailable = document.querySelector('[data-variant="' + variantId + '"]').getAttribute('data-variantavailable')
    
    if(productAvailable === "true"){
      captionTarget.innerHTML= ""
    }else{
    	captionTarget.innerHTML= "Selected color currently unavailable"
    }
    
      // DESCRIBE. EXPLAIN BAD PRACTICES AND WHY, UNFAMILIARITY WITH LIQUID. COULDNT ADD TO USER SIDE
      
      // TEST CASES!!! 
      // OTHER STORES REMOVE initialImgUrl HARDCODED
      
    }