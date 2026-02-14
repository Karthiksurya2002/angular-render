import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-iframe-report',
  standalone: false,
  templateUrl: './iframe-report.component.html',
  styleUrl: './iframe-report.component.css',
})
export class IframeReportComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
    console.log(this.data);
  }
  printPrescription() {
    setTimeout(() => {
      const content = document.getElementById('print-content')?.innerHTML || '';
      const title =
        document.getElementById('printTitle')?.innerHTML || 'SHMP Hospital';

      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';

      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;
      iframeDoc?.open();

      iframeDoc?.write(`
      <html>
        <head>
          <title>SHMP Hospital - Prescription</title>
          <style>
            @page {
              margin: 20mm;
            }

            body {
              font-family: Arial, sans-serif;
              color: #000;
            }

            .header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }

            .logo {
              width: 80px;
              height: 80px;
              border: 1px solid #ccc;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
            }

            .hospital-name {
              text-align: center;
              flex: 1;
            }

            h1 {
              margin: 0;
              font-size: 20px;
            }

            h2 {
              text-align: center;
              margin-top: 10px;
            }

            p {
              margin: 6px 0;
              font-size: 14px;
            }

            .footer {
              margin-top: 40px;
              border-top: 1px solid #000;
              padding-top: 10px;
              font-size: 12px;
              text-align: center;
            }

            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>

        <body>
          <div class="header">
            <div class="logo">
              LOGO
            </div>

            <div class="hospital-name">
              <h1>${title}</h1>
              <div>Official Medical Prescription</div>
            </div>

            <div style="width:80px;"></div>
          </div>

          ${content}

          <div class="footer">
            This is a system generated prescription from SHMP Hospital
          </div>

          <script>
            window.onload = function () {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `);

      iframeDoc?.close();
    }, 300);
  }
}
