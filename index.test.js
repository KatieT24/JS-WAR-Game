const expect = chai.expect;
const should = chai.should;

describe('Main Section', function() {
    describe('Card Class Tests', function() {
        it('Card should contain all 3 properties', function() {
            let card = new Card("hearts", 10, 8)
            expect(card).to.have.property("suit")
            expect(card).to.have.property("rank")
            expect(card).to.have.property("value")
                });
    });
});
