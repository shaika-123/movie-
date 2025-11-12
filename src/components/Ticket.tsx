'use client';

interface TicketProps {
  id: string;
  name: string;
  age: number;
  date: string;
  time: string;
}

interface TicketDisplayProps extends TicketProps {
  onRegisterAnother?: () => void;
}

function createPrintableTicket({ id, name, age, date, time }: TicketProps) {
  const wrapper = document.createElement('div');
  wrapper.style.width = '100%';
  wrapper.style.maxWidth = '600px';
  wrapper.style.margin = '0 auto';
  wrapper.style.padding = '32px';
  wrapper.style.borderRadius = '24px';
  wrapper.style.border = '2px solid #a855f7';
  wrapper.style.background = 'linear-gradient(135deg, #4c1d95 0%, #1f2937 55%, #0f172a 100%)';
  wrapper.style.fontFamily = '"Poppins", Arial, sans-serif';
  wrapper.style.color = '#f8fafc';
  wrapper.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.35)';

  const header = document.createElement('div');
  header.style.textAlign = 'center';
  header.style.marginBottom = '32px';
  header.style.paddingBottom = '24px';
  header.style.borderBottom = '1px solid rgba(168, 85, 247, 0.3)';

  const title = document.createElement('h1');
  title.textContent = 'ASTRA';
  title.style.fontSize = '2.5rem';
  title.style.fontWeight = '700';
  title.style.margin = '0 0 8px';
  title.style.backgroundImage = 'linear-gradient(90deg, #c084fc 0%, #f472b6 50%, #60a5fa 100%)';
  title.style.color = 'transparent';
  title.style.backgroundClip = 'text';

  const subtitle = document.createElement('p');
  subtitle.textContent = 'MOVIE PRODUCTION';
  subtitle.style.margin = '0';
  subtitle.style.fontSize = '1.1rem';
  subtitle.style.letterSpacing = '0.2em';
  subtitle.style.color = '#d8b4fe';

  const label = document.createElement('p');
  label.textContent = 'EVENT TICKET';
  label.style.marginTop = '12px';
  label.style.fontSize = '0.9rem';
  label.style.letterSpacing = '0.4em';
  label.style.color = '#e9d5ff';

  header.appendChild(title);
  header.appendChild(subtitle);
  header.appendChild(label);
  wrapper.appendChild(header);

  const ticketInfo = document.createElement('div');
  ticketInfo.style.display = 'grid';
  ticketInfo.style.gap = '20px';
  ticketInfo.style.marginBottom = '28px';

  const ticketIdBlock = document.createElement('div');
  ticketIdBlock.style.background = 'rgba(15, 23, 42, 0.6)';
  ticketIdBlock.style.border = '1px solid rgba(168, 85, 247, 0.25)';
  ticketIdBlock.style.borderRadius = '16px';
  ticketIdBlock.style.padding = '18px';

  const ticketIdLabel = document.createElement('p');
  ticketIdLabel.textContent = 'Ticket ID';
  ticketIdLabel.style.margin = '0 0 6px';
  ticketIdLabel.style.fontSize = '0.75rem';
  ticketIdLabel.style.letterSpacing = '0.3em';
  ticketIdLabel.style.color = '#cbd5f5';

  const ticketIdValue = document.createElement('p');
  ticketIdValue.textContent = id;
  ticketIdValue.style.margin = '0';
  ticketIdValue.style.fontSize = '1.5rem';
  ticketIdValue.style.fontFamily = '"JetBrains Mono", "Fira Code", monospace';
  ticketIdValue.style.color = '#ffffff';

  ticketIdBlock.appendChild(ticketIdLabel);
  ticketIdBlock.appendChild(ticketIdValue);
  ticketInfo.appendChild(ticketIdBlock);

  const infoGrid = document.createElement('div');
  infoGrid.style.display = 'grid';
  infoGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px, 1fr))';
  infoGrid.style.gap = '16px';

  const buildCard = (cardLabel: string, cardValue: string) => {
    const card = document.createElement('div');
    card.style.background = 'rgba(15, 23, 42, 0.6)';
    card.style.border = '1px solid rgba(168, 85, 247, 0.25)';
    card.style.borderRadius = '16px';
    card.style.padding = '18px';

    const labelEl = document.createElement('p');
    labelEl.textContent = cardLabel;
    labelEl.style.margin = '0 0 6px';
    labelEl.style.fontSize = '0.75rem';
    labelEl.style.letterSpacing = '0.3em';
    labelEl.style.color = '#cbd5f5';

    const valueEl = document.createElement('p');
    valueEl.textContent = cardValue;
    valueEl.style.margin = '0';
    valueEl.style.fontSize = '1.125rem';
    valueEl.style.fontWeight = '600';
    valueEl.style.color = '#ffffff';

    card.appendChild(labelEl);
    card.appendChild(valueEl);
    return card;
  };

  infoGrid.appendChild(buildCard('Name', name));
  infoGrid.appendChild(buildCard('Age', `${age} years`));
  infoGrid.appendChild(buildCard('Date', date));
  infoGrid.appendChild(buildCard('Time', time));

  ticketInfo.appendChild(infoGrid);
  wrapper.appendChild(ticketInfo);

  const footer = document.createElement('div');
  footer.style.borderTop = '1px solid rgba(168, 85, 247, 0.3)';
  footer.style.paddingTop = '24px';
  footer.style.textAlign = 'center';

  const footerText = document.createElement('p');
  footerText.textContent = 'Thank you for registering! Keep this ticket safe.';
  footerText.style.margin = '0 0 12px';
  footerText.style.color = '#d8b4fe';

  const generatedText = document.createElement('p');
  generatedText.textContent = `Ticket generated on ${new Date().toLocaleDateString()}`;
  generatedText.style.margin = '0';
  generatedText.style.color = '#94a3b8';
  generatedText.style.fontSize = '0.75rem';

  footer.appendChild(footerText);
  footer.appendChild(generatedText);
  wrapper.appendChild(footer);

  return wrapper;
}

function TicketCard({ id, name, age, date, time }: TicketProps) {
  return (
    <div
      className="max-w-2xl mx-auto rounded-2xl p-8 border-2 border-purple-500 shadow-2xl"
      style={{
        fontFamily: 'var(--font-poppins)',
        background: 'linear-gradient(135deg, #4c1d95 0%, #1f2937 55%, #0f172a 100%)',
      }}
    >
      <div className="text-center mb-8 pb-6 border-b border-purple-500/30">
        <h1
          className="text-4xl font-bold text-transparent bg-clip-text mb-2"
          style={{
            backgroundImage: 'linear-gradient(90deg, #c084fc 0%, #f472b6 50%, #60a5fa 100%)',
          }}
        >
          ASTRA
        </h1>
        <p className="text-purple-200 text-lg font-light tracking-wider">MOVIE PRODUCTION</p>
        <p className="text-purple-300 text-sm mt-2">EVENT TICKET</p>
      </div>

      <div className="space-y-5 mb-8">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Ticket ID</p>
          <p className="text-white text-2xl font-bold font-mono">{id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Name</p>
            <p className="text-white text-lg font-semibold">{name}</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Age</p>
            <p className="text-white text-lg font-semibold">{age} years</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Date</p>
            <p className="text-white text-lg font-semibold">{date}</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Time</p>
            <p className="text-white text-lg font-semibold">{time}</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-purple-500/30 text-center">
        <p className="text-purple-300 text-sm">Thank you for registering! Keep this ticket safe.</p>
        <p className="text-gray-500 text-xs mt-2">Ticket generated on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default function Ticket({ id, name, age, date, time, onRegisterAnother }: TicketDisplayProps) {
  const downloadPDF = async () => {
    let tempContainer: HTMLDivElement | null = null;

    try {
      const html2pdf = (await import('html2pdf.js')).default;

      tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '0';
      tempContainer.style.top = '0';
      tempContainer.style.width = '100vw';
      tempContainer.style.padding = '24px';
      tempContainer.style.background = '#0f172a';
      tempContainer.style.zIndex = '-9999';

      const printableTicket = createPrintableTicket({ id, name, age, date, time });
      tempContainer.appendChild(printableTicket);
      document.body.appendChild(tempContainer);

      await new Promise((resolve) => setTimeout(resolve, 150));

      const opt = {
        margin: 10,
        filename: `Ticket-${id}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { orientation: 'portrait' as const, unit: 'mm', format: 'a4' },
      };

      await html2pdf().set(opt).from(printableTicket).save();
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      if (tempContainer && document.body.contains(tempContainer)) {
        document.body.removeChild(tempContainer);
      }
    }
  };

  const handleRegisterAnother = async () => {
    await downloadPDF();
    onRegisterAnother?.();
  };

  return (
    <div className="space-y-6">
      <TicketCard id={id} name={name} age={age} date={date} time={time} />

      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={downloadPDF}
          className="px-8 py-3 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl cursor-pointer"
          style={{ fontFamily: 'var(--font-poppins)', background: 'linear-gradient(90deg, #7c3aed 0%, #ec4899 100%)' }}
        >
          ⬇️ Download Ticket as PDF
        </button>
        <button
          onClick={handleRegisterAnother}
          className="px-8 py-3 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          style={{ fontFamily: 'var(--font-poppins)', background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)' }}
        >
          ← Register Another
        </button>
      </div>
    </div>
  );
}
