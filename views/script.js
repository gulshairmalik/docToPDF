const searchInMiami = () => {

    document.getElementById('pdf').style.display = 'none';
    document.getElementById('csv').style.display = 'none';
    document.getElementById('error').innerHTML = '';
    document.getElementById('submit').innerText = 'Loading...';
    let searchedValue = document.getElementById('input').value;
    
    axios.get("/miami/getPDF?address="+searchedValue,{responseType: 'arraybuffer'}).then((res) => {
        let enc = new TextDecoder("utf-8");
        let error = enc.decode(res.data);

        if(error==='Address is invalid.'){
            document.getElementById('error').innerHTML = error;
            document.getElementById('submit').innerText = 'Search';
        }
        else{
            let blob = new Blob([res.data], { type:'application/pdf' });
            let pdfElement = document.getElementById('pdf');
            pdfElement.href = window.URL.createObjectURL(blob);
            pdfElement.download = 'Page.pdf';

            axios.get("/miami/getCSV",{responseType: 'arraybuffer'}).then((resp) => {
                document.getElementById('submit').innerText = 'Search';
                let blob = new Blob([resp.data], { type:'application/csv' });
                let csvElement = document.getElementById('csv');
                csvElement.href = window.URL.createObjectURL(blob);
                csvElement.download = 'Page.csv';
                document.getElementById('pdf').style.display = 'block';
                document.getElementById('csv').style.display = 'block';
            })
        }
    });
}

const searchInPalm = () => {

    document.getElementById('pdf1').style.display = 'none';
    document.getElementById('csv1').style.display = 'none';
    document.getElementById('getTax').style.display = 'none';
    document.getElementById('error1').innerHTML = '';
    document.getElementById('submit1').innerText = 'Loading...';
    let searchedValue = document.getElementById('input1').value;
    
    axios.get("/palm/getPDF?address="+searchedValue,{responseType: 'arraybuffer'}).then((res) => {
        let enc = new TextDecoder("utf-8");
        let error = enc.decode(res.data);

        if(error==='Address is invalid.'){
            document.getElementById('error1').innerHTML = error;
            document.getElementById('submit1').innerText = 'Search';
        }
        else{
            let blob = new Blob([res.data], { type:'application/pdf' });
            let pdfElement = document.getElementById('pdf1');
            pdfElement.href = window.URL.createObjectURL(blob);
            pdfElement.download = 'Page.pdf';

            axios.get("/palm/getCSV",{responseType: 'arraybuffer'}).then((resp) => {
                document.getElementById('submit1').innerText = 'Search';
                let blob = new Blob([resp.data], { type:'application/csv' });
                let csvElement = document.getElementById('csv1');
                csvElement.href = window.URL.createObjectURL(blob);
                csvElement.download = 'Page.csv';
                document.getElementById('pdf1').style.display = 'block';
                document.getElementById('csv1').style.display = 'block';
                document.getElementById('getTax').style.display = 'block';
            })
        }
    });
}

const searchTaxInPalm = () => {

    document.getElementById('tax').style.display = 'none';
    document.getElementById('getTax').innerText = 'Loading...';

    let searchedValue = document.getElementById('input1').value;
    
    axios.get("/palm/getTaxPDF?address="+searchedValue,{responseType: 'arraybuffer'}).then((res) => {
        let enc = new TextDecoder("utf-8");
        let error = enc.decode(res.data);

        if(error==='Address is invalid.'){
            document.getElementById('error2').innerHTML = 'No Tax Information found for this address.';
            document.getElementById('getTax').style.display = 'none';
        }
        else{
            let blob = new Blob([res.data], { type:'application/pdf' });
            let pdfElement = document.getElementById('pdf2');
            pdfElement.href = window.URL.createObjectURL(blob);
            pdfElement.download = 'Tax.pdf';

            axios.get("/palm/getTaxCSV",{responseType: 'arraybuffer'}).then((resp) => {
                document.getElementById('getTax').style.display = 'none';
                let blob = new Blob([resp.data], { type:'application/csv' });
                let csvElement = document.getElementById('csv2');
                csvElement.href = window.URL.createObjectURL(blob);
                csvElement.download = 'Tax.csv';
                document.getElementById('tax').style.display = 'block';
                document.getElementById('get3Tax').style.display = 'block';
            })
        }
    });
}

const searchTaxBillInPalm = () => {

    document.getElementById('taxBill').style.display = 'none';
    document.getElementById('get3Tax').innerText = 'Loading...';

    let searchedValue = document.getElementById('input1').value;
    
    axios.get("/palm/getTaxBills?address="+searchedValue).then((res) => {

        let arrOfLinks = res.data;

        axios.get("/palm/getTaxBill1CSV?pageAddress="+encodeURIComponent(arrOfLinks[0]),{responseType: 'arraybuffer'}).then(async (res1) => {

            const pdf1Response = await axios.get("/palm/getTaxBill1PDF",{responseType: 'arraybuffer'});
            const pdf1Data = await pdf1Response.data;

            let blob1 = new Blob([res1.data], { type:'application/csv' });
            let csvElement1 = document.getElementById('csvTax1');
            csvElement1.href = window.URL.createObjectURL(blob1);
            csvElement1.download = 'TaxBill1.csv';

            let blob1a = new Blob([pdf1Data], { type:'application/pdf' });
            let pdfElement1 = document.getElementById('pdfTax1');
            pdfElement1.href = window.URL.createObjectURL(blob1a);
            pdfElement1.download = 'TaxBill1.pdf';
   

            axios.get("/palm/getTaxBill2CSV?pageAddress="+encodeURIComponent(arrOfLinks[1]),{responseType: 'arraybuffer'}).then(async (res2) => {

                const pdf2Response = await axios.get("/palm/getTaxBill2PDF",{responseType: 'arraybuffer'});
                const pdf2Data = await pdf2Response.data;

                let blob2 = new Blob([res2.data], { type:'application/csv' });
                let csvElement2 = document.getElementById('csvTax2');
                csvElement2.href = window.URL.createObjectURL(blob2);
                csvElement2.download = 'TaxBill2.csv';

                let blob2a = new Blob([pdf2Data], { type:'application/PDF' });
                let pdfElement2 = document.getElementById('pdfTax2');
                pdfElement2.href = window.URL.createObjectURL(blob2a);
                pdfElement2.download = 'TaxBill2.pdf';

                axios.get("/palm/getTaxBill3CSV?pageAddress="+encodeURIComponent(arrOfLinks[2]),{responseType: 'arraybuffer'}).then(async (res3) => {

                    document.getElementById('get3Tax').style.display = 'none';
                    
                    const pdf3Response = await axios.get("/palm/getTaxBill3PDF",{responseType: 'arraybuffer'});
                    const pdf3Data = await pdf3Response.data;


                    let blob3 = new Blob([res3.data], { type:'application/csv' });
                    let csvElement3 = document.getElementById('csvTax3');
                    csvElement3.href = window.URL.createObjectURL(blob3);
                    csvElement3.download = 'TaxBill3.csv';

                    let blob3a = new Blob([pdf3Data], { type:'application/pdf' });
                    let pdfElement3 = document.getElementById('pdfTax3');
                    pdfElement3.href = window.URL.createObjectURL(blob3a);
                    pdfElement3.download = 'TaxBill3.pdf';

                    document.getElementById('taxBill').style.display = 'block';
                    document.getElementById('getAssesment').style.display = 'block';
      
                });
                
            });
            
        });

        
    });
}


const searchAssesmentInPalm = () => {

    document.getElementById('assesment').style.display = 'none';
    document.getElementById('getAssesment').innerText = 'Loading...';
    let searchedValue = document.getElementById('input1').value;
    
    axios.get("/palm/getAssesment?address="+searchedValue,{responseType: 'arraybuffer'}).then((res) => {

        let blob = new Blob([res.data], { type:'application/pdf' });
        let pdfElement = document.getElementById('assesPdf');
        pdfElement.href = window.URL.createObjectURL(blob);
        pdfElement.download = 'Assesment.pdf';
        document.getElementById('getAssesment').style.display = 'none';
        document.getElementById('assesment').style.display = 'block';

    });
}
