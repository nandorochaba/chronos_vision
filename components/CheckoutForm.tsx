
import React, { useState } from 'react';
import { CartItem, CheckoutData } from '../types';

interface CheckoutFormProps {
  cart: CartItem[];
  onClose: () => void;
  theme: any;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cart, onClose, theme }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutData>({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    neighborhood: '',
    reference: '',
    city: '',
    cep: ''
  });

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalSteps = 9;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = '#' + Math.random().toString(36).substr(2, 5).toUpperCase();
    const formatPrice = (v: number) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    const itemsText = cart.map(item => 
      `📦 ${item.product.name} (x${item.quantity}) - ${formatPrice(item.product.price)}`
    ).join('\n');

    const fullMessage = `PEDIDO CHRONOS & VISION ${orderId}

Olá! Gostaria de finalizar a compra das seguintes peças:

${itemsText}

💰 TOTAL: ${formatPrice(total)}

DADOS DE ENTREGA:
👤 Cliente: ${formData.fullName}
📱 WhatsApp: ${formData.phone}
🏠 Endereço: ${formData.street}, ${formData.number}
📍 Bairro: ${formData.neighborhood}
🏙️ Cidade: ${formData.city} - CEP: ${formData.cep}

Fico no aguardo do PIX para envio!`;

    const whatsappUrl = `https://wa.me/559898465825?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Field label="Qual seu nome?" placeholder="Seu nome completo" value={formData.fullName} onChange={v => setFormData({...formData, fullName: v})} theme={theme} />;
      case 2: return <Field label="Seu melhor E-mail" placeholder="contato@exemplo.com" value={formData.email} onChange={v => setFormData({...formData, email: v})} theme={theme} />;
      case 3: return <Field label="Seu WhatsApp" placeholder="(98) 99999-9999" value={formData.phone} onChange={v => setFormData({...formData, phone: v})} theme={theme} />;
      case 4: return <Field label="Endereço (Rua)" placeholder="Ex: Rua das Flores" value={formData.street} onChange={v => setFormData({...formData, street: v})} theme={theme} />;
      case 5: return <Field label="Número" placeholder="123 ou S/N" value={formData.number} onChange={v => setFormData({...formData, number: v})} theme={theme} />;
      case 6: return <Field label="Bairro" placeholder="Ex: Renascença" value={formData.neighborhood} onChange={v => setFormData({...formData, neighborhood: v})} theme={theme} />;
      case 7: return <Field label="Cidade" placeholder="São Luís - MA" value={formData.city} onChange={v => setFormData({...formData, city: v})} theme={theme} />;
      case 8: return <Field label="CEP" placeholder="65000-000" value={formData.cep} onChange={v => setFormData({...formData, cep: v})} theme={theme} />;
      case 9: return (
        <div className="space-y-4 animate-step-in">
          <h3 className="text-xs uppercase font-black tracking-widest opacity-60">Confirmação do Pedido</h3>
          <div className="p-6 bg-white/5 border border-white/5 space-y-2 text-xs">
            <p><strong>Valor:</strong> R$ {total.toLocaleString('pt-BR')}</p>
            <p><strong>Local:</strong> {formData.city}</p>
          </div>
          <p className="text-[10px] opacity-40 leading-relaxed italic">Ao clicar em finalizar, abriremos seu WhatsApp para que nosso atendente envie a chave PIX e confirme o envio prioritário.</p>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0B0B0B]/98 backdrop-blur-xl" onClick={onClose} />
      <div className={`relative w-full max-w-lg ${theme.sectionBg} border ${theme.border} p-10 space-y-10 shadow-2xl animate-[fade-in-up_0.5s_ease-out]`}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
          <div className={`h-full ${theme.accentBg} transition-all duration-500`} style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-serif">Quase lá...</h2>
          <p className="text-[8px] uppercase tracking-[0.4em] opacity-40">Passo {step} de {totalSteps}</p>
        </div>
        <div className="min-h-[120px]">{renderStep()}</div>
        <div className="pt-6 flex flex-col gap-4">
          <button 
            onClick={step < totalSteps ? handleNext : handleSubmit}
            className={`w-full py-5 ${theme.accentBg} text-black text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-90`}
          >
            {step < totalSteps ? 'Próximo Passo' : 'Finalizar e Pagar'}
          </button>
          <div className="flex justify-between items-center text-[9px] uppercase tracking-widest opacity-30">
            {step > 1 ? <button onClick={handleBack}>← Voltar</button> : <div/>}
            <button onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, placeholder, value, onChange, theme }: any) => (
  <div className="space-y-2 animate-step-in">
    <label className="text-[9px] uppercase tracking-widest opacity-40 font-black">{label}</label>
    <input autoFocus required className={`w-full bg-transparent border-b ${theme.border} py-3 text-lg focus:outline-none focus:${theme.accentBorder} transition-colors`} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

export default CheckoutForm;
