import dateFormat, { masks } from "dateformat";

export const getInvoiceText = (client, address, invoiceNumber, topic, createdDate, dueDate, positions, nettoSum, ValueTax, TotalAmount) => {


  return (
    `
  <!DOCTYPE html>
  <html lang="en">
    <head>
    <style>
    body{
      margin-top:20px;
      background:#eee;
  }
  
  .invoice {
      background: #fff;
      padding: 20px
  }
  
  .invoice-company {
      font-size: 20px
  }
  
  .invoice-header {
      margin: 0 -20px;
      background: #f0f3f4;
      padding: 20px
  }
  
  .invoice-date,
  .invoice-from,
  .invoice-to {
      display: table-cell;
      width: 1%
  }
  
  .invoice-from,
  .invoice-to {
      padding-right: 20px
  }
  
  .invoice-date .date,
  .invoice-from strong,
  .invoice-to strong {
      font-size: 16px;
      font-weight: 600
  }
  
  .invoice-date {
      text-align: right;
      padding-left: 20px
  }
  
  .invoice-price {
      background: #f0f3f4;
      display: table;
      width: 100%
  }
  
  .invoice-price .invoice-price-left,
  .invoice-price .invoice-price-right {
      display: table-cell;
      padding: 20px;
      font-size: 20px;
      font-weight: 600;
      width: 75%;
      position: relative;
      vertical-align: middle
  }
  
  .invoice-price .invoice-price-left .sub-price {
      display: table-cell;
      vertical-align: middle;
      padding: 0 20px
  }
  
  .invoice-price small {
      font-size: 12px;
      font-weight: 400;
      display: block
  }
  
  .invoice-price .invoice-price-row {
      display: table;
      float: left
  }
  
  .invoice-price .invoice-price-right {
      width: 25%;
      background: #2d353c;
      color: #fff;
      font-size: 28px;
      text-align: right;
      vertical-align: bottom;
      font-weight: 300
  }
  
  .invoice-price .invoice-price-right small {
      display: block;
      opacity: .6;
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 12px
  }
  
  .invoice-footer {
      border-top: 1px solid #ddd;
      padding-top: 10px;
      font-size: 10px
  }
  
  .invoice-note {
      color: #999;
      margin-top: 80px;
      font-size: 85%
  }
  
  .invoice>div:not(.invoice-footer) {
      margin-bottom: 20px
  }
  
  .btn.btn-white, .btn.btn-white.disabled, .btn.btn-white.disabled:focus, .btn.btn-white.disabled:hover, .btn.btn-white[disabled], .btn.btn-white[disabled]:focus, .btn.btn-white[disabled]:hover {
      color: #2d353c;
      background: #fff;
      border-color: #d9dfe3;
  }
    </style>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
  
    <body>
      
    
<div class="container">
   <div class="col-md-12">
      <div class="invoice">
         <!-- begin invoice-company -->
         <div class="invoice-company text-inverse f-w-600">
            <span class="pull-right hidden-print">
            
            </span>
            SBill, Inc
         </div>
         <!-- end invoice-company -->
         <!-- begin invoice-header -->
         <div class="invoice-header">
            <div class="invoice-from">
               <small>Von</small>
               <address class="m-t-5 m-b-5">
                  <strong class="text-inverse">Johannes Siedersberger IT-Beratung</strong><br>
                  Bergfeldstr. 3<br>
                  82281 Egenhofen<br> 
               </address>
            </div>
            <div class="invoice-to">
               <small>An</small>
               <address class="m-t-5 m-b-5">
                  <strong class="text-inverse">${client}</strong><br>
                  ${address.toString().replace("\n", "<br>")}<br>
               </address>
            </div>
            <div class="invoice-date">
               <small>Zahlbar bis</small>
               <div class="date text-inverse m-t-5">${dateFormat(dueDate, "dddd, mmmm dS")}
               </div>
  <div class="invoice-detail">
    #${invoiceNumber}<br>

  </div>
            </div >
         </div >
        
         <div class="invoice-content">
            <!-- begin table-responsive -->
            <div class="table-responsive">
               <table class="table table-invoice">
                  <thead>
                     <tr>
                        <th>Beschreibung</th>
                        <th class="text-center" width="10%">PREIS</th>
                        <th class="text-center" width="10%">ANZAHL</th>
                        <th class="text-right" width="20%">(NETTO)</th>
                     </tr>
                  </thead>
                  <tbody>
                     ${positions.map((value, index) => {
      return (
        `<tr>
                <td>
                  <span class="text-inverse">${value.description}</span><br>
                    <small></small>
                </td>
                <td class="text-center">${value.princePerItem},00€</td>
                <td class="text-center">${value.quantity}</td>
                <td class="text-right">${(value.quantity) * (value.princePerItem)},00 €</td>
              </tr>`
      )
    })
    }
                    
                  </tbody>
               </table>
            </div>
            <!-- end table-responsive -->
            <!-- begin invoice-price -->
            <div class="invoice-price">
               <div class="invoice-price-left">
                  <div class="invoice-price-row">
                     <div class="sub-price">
                        <small>Netto Preis</small>
                        <span class="text-inverse">${nettoSum}</span>
                     </div>
                     <div class="sub-price">
                        <i class="fa fa-plus text-muted"></i>
                     </div>
                     <div class="sub-price">
                        <small>Mehrwertsteuer (19%)</small>
                        <span class="text-inverse">${ValueTax}</span>
                     </div>
                  </div>
               </div>
               <div class="invoice-price-right">
                  <small>Gesamtpreis</small> <span class="f-w-600">${TotalAmount}</span>
               </div>
            </div>
            <!-- end invoice-price -->
         </div>
         <!--end invoice - content-- >
         < !--begin invoice - note-- >
  <div class="invoice-note">
    ${null}
      </div>
      <!-- end invoice-note -->
      <!-- begin invoice-footer -->
      <div class="invoice-footer">
        <p class="text-center m-b-5 f-w-600">
          THANK YOU FOR YOUR BUSINESS
        </p>
        <p class="text-center">
          <span class="m-r-10"><i class="fa fa-fw fa-lg fa-globe"></i> matiasgallipoli.com</span>
          <span class="m-r-10"><i class="fa fa-fw fa-lg fa-phone-volume"></i> T:016-18192302</span>
          <span class="m-r-10"><i class="fa fa-fw fa-lg fa-envelope"></i> rtiemps@gmail.com</span>
        </p>
      </div>
      <!-- end invoice-footer -->
  </div>
   </div >
</div >
    </body >


  `)
}
