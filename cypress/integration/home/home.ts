context('Home', () => {
    it('Should download a ICal', () => {
        cy.visit('/')
        cy.get("[data-test=button--download]").click();
    })

    it('Should filtering by user ID', ()=>{
        cy.visit('?userID=2664')
        cy.get('[data-test=user-list]').within(()=>{
            cy.get('[data-test=user-name]').contains('Mike')
        })
    })
    it('Should filtering by start and end date', ()=>{
        cy.visit('?startDate=2017-01-16&endDate=2017-05-16')
        cy.get('[data-test=timeline-header]').within(()=>{
            cy.get('div').eq(0).within(()=>{
                cy.get('[data-test=timeline-month-name]').contains('January')
            })
        })
    })
})