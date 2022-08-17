export const allocationEngine = (bidding, totalTokensAvailable) => {
    const sortedBids = bidding.sort((a, b) => {
        return b.bidding_price - a.bidding_price;
    });
    const numberOfTokens = totalTokensAvailable;
    let index = 0;
    let subscriptionType = "Balanced";
    let issuedIndex;
    let overIndex;
    while(numberOfTokens > 0) {
        numberOfTokens -= sortedBids[index].token_qty;
        index++;
    }
    issuedIndex = index;
    if(numberOfTokens < 0) {
        subscriptionType = "Over";
        issuedIndex--;
        overIndex = index;
    } else if(numberOfTokens > 0){
        subscriptionType = "Under";
    }
    let allocateInvestors = sortedBids.slice(0, issuedIndex).map(a => a.investor_id);

    let superCase = {
        superCaseInvId: "",
        tokensToBeGranted: ""
    }

    if (subscriptionType == "Over") {
        let overBid = sortedBids[overIndex];
        superCase.superCaseInvId = overBid.investor_id;
        superCase.tokensToBeGranted = overBid.token_qty + numberOfTokens; // here numberOfTokens will be negative
    }

    return {allocateInvestors, superCase};
};