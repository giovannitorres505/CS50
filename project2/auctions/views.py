@login_required
def close_auction(request, listing_id):
    listing = Listing.objects.get(pk=listing_id)
    if request.user == listing.owner:
        listing.active = False
        listing.save()
        # Opcional: Determinar o vencedor pelo maior lance no Bid.objects.filter(listing=listing)
    return redirect("listing", listing_id=listing_id)
