
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
    
    const orderId = '#' + Math.random().toString(36).substr(2, 7).toUpperCase();
    const baseUrl = window.location.origin;
    
    // Luxury price formatting (R$ 14.200)
    const formatPrice = (value: number) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    };

    const itemsText = cart.map(item => 
      `* ${item.product.name}\n  Qtd: ${item.quantity} | ${formatPrice(item.product.price)}\n  Catálogo: ${baseUrl}/#/product/${item.product.id}`
    ).join('\n\n');

    const totalFormatted = formatPrice(total);

    // EXACT TEMPLATE AS REQUESTED
    const fullMessage = `SOLICITAÇÃO DE PEDIDO — CHRONOS & VISION

Olá! Acabo de selecionar peças exclusivas no catálogo e gostaria de confirmar o pagamento.

PEDIDO: ${orderId}
---------------------------------

DETALHES DA SELEÇÃO:
${itemsText}

VALOR TOTAL: ${totalFormatted}

---------------------------------
DADOS PARA ENTREGA:
👤 Nome: ${formData.fullName}
📧 E-mail: ${formData.email}
🏠 Endereço: ${formData.street}, ${formData.number}${formData.neighborhood ? ` (${formData.neighborhood})` : ''}
📍 Cidade: ${formData.city}
📮 CEP: ${formData.cep}

PAGAMENTO: Aguardando conferência do PIX.
Enviado via Chronos & Vision`;

    // Correcting WhatsApp number to 55 + 98 + 98465825
    const whatsappUrl = `https://wa.me/559898465825?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-step-in">
            <div className="space-y-1">
              <label className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Como podemos chamá-lo?</label>
              <input 
                autoFocus
                required
                type="text" 
                className={`w-full bg-transparent border-b ${theme.border} py-3 text-lg md:text-xl focus:outline-none focus:${theme.accentBorder} transition-colors`}
                placeholder="Nome Completo"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Contato WhatsApp</label>
              <input 
                required
                type="tel" 
                className={`w-full bg-transparent border-b ${theme.border} py-3 text-lg md:text-xl focus:outline-none focus:${theme.accentBorder} transition-colors`}
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-step-in">
             <div className="space-y-1">
              <label className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Seu E-mail para faturamento</label>
              <input 
                autoFocus
                required
                type="email" 
                className={`w-full bg-transparent border-b ${theme.border} py-3 text-lg md:text-xl focus:outline-none focus:${theme.accentBorder} transition-colors`}
                placeholder="seu@email.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-step-in">
             <div className="space-y-1">
              <label className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Endereço de Entrega (Rua)</label>
              <input 
                autoFocus
                required
                type="text" 
                className={`w-full bg-transparent border-b ${theme.border} py-3 text-lg md:text-xl focus:outline-none focus:${theme.accentBorder} transition-colors`}
                placeholder="Ex: Avenida Paulista"
                value={formData.street}
                onChange={e => setFormData({ ...formData, street: e.target.value })}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-step-in">
             <div className="space-y-1">
              <label className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Número</label>
              <input 
                autoFocus
                required
                type="text" 
                className={`w-full bg-transparent border-b ${theme.border} py-3 text-lg md:text-xl focus:outline-none focus:${theme.accentBorder} transition-colors`}
                placeholder="Número ou S/N"
                value={formData.number}
                onChange={e => setFormData({ ...formData, number: e.target.value })}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-step-in">
             <div className="space-y-1">
              <label className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Bairro</label>
              <input 
                autoFocus
                required
                type="text" 
                className={`w-full bg-transparent border-b ${theme.border} py-3 text-lg md:text-xl focus:outline-none focus:${theme.accentBorder} transition-colors`}
                placeholder="Ex: Jardim Europa"
                value={formData.neighborhood}
                onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
              />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 animate-step-in">
             <div className="space-y-1">
              <label className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Referência (Opcional)</label>
              <input 
                autoFocus
                type="text" 
                className={`w-full bg-transparent border-b ${theme.border} py-3 text-lg md:text-xl focus:outline-none focus:${theme.accentBorder} transition-colors`}
                placeholder="Próximo a..."
                value={formData.reference}
                onChange={e => setFormData({ ...formData, reference: e.target.value })}
              />
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6 animate-step-in">
             <div className="space-y-1">
              <label className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Cidade</label>
              <input 
                autoFocus
                required
                type="text" 
                className={`w-full bg-transparent border-b ${theme.border} py-3 text-lg md:text-xl focus:outline-none focus:${theme.accentBorder} transition-colors`}
                placeholder="Ex: Santa Luzia - MA"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6 animate-step-in">
             <div className="space-y-1">
              <label className="text-[10px] opacity-40 uppercase tracking-widest font-bold">CEP</label>
              <input 
                autoFocus
                required
                type="text" 
                className={`w-full bg-transparent border-b ${theme.border} py-3 text-lg md:text-xl focus:outline-none focus:${theme.accentBorder} transition-colors`}
                placeholder="00000-000"
                value={formData.cep}
                onChange={e => setFormData({ ...formData, cep: e.target.value })}
              />
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-6 animate-step-in">
             <div className="space-y-4">
               <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 italic">Resumo de Atendimento VIP</h3>
               <div className="p-5 bg-white/5 border border-white/5 space-y-3 text-[13px] font-light">
                 <p><span className="opacity-40 uppercase text-[9px]">Cliente:</span> {formData.fullName}</p>
                 <p><span className="opacity-40 uppercase text-[9px]">E-mail:</span> {formData.email}</p>
                 <p><span className="opacity-40 uppercase text-[9px]">Local:</span> {formData.city}</p>
                 <p><span className="opacity-40 uppercase text-[9px]">Status:</span> Curadoria em Processamento</p>
               </div>
               <p className="text-[10px] opacity-40 leading-relaxed">
                 Ao clicar abaixo, sua solicitação será enviada diretamente ao nosso Concierge no WhatsApp para finalização do pagamento via PIX.
               </p>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isCurrentStepValid = () => {
    switch (step) {
      case 1: return formData.fullName.length > 2 && formData.phone.length > 5;
      case 2: return formData.email.includes('@') && formData.email.length > 5;
      case 3: return formData.street.length > 2;
      case 4: return formData.number.length > 0;
      case 5: return formData.neighborhood.length > 2;
      case 6: return true; 
      case 7: return formData.city.length > 2;
      case 8: return formData.cep.length >= 8;
      default: return true;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className={`absolute inset-0 ${theme.bg}/98 backdrop-blur-xl`} onClick={onClose} />
      
      <div className={`relative w-full max-w-xl ${theme.sectionBg} ${theme.text} border ${theme.accentBorder}/30 p-8 md:p-12 space-y-10 animate-[fade-in-up_0.5s_ease-out]`}>
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
          <div 
            className={`h-full ${theme.accentBg} transition-all duration-500 ease-out`}
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-serif">Solicitação Exclusiva</h2>
          <p className={`text-[10px] ${theme.accent} uppercase tracking-[0.3em]`}>Etapa {step} de {totalSteps}</p>
        </div>

        <div className="min-h-[140px]">
          {renderStep()}
        </div>

        <div className="pt-6 flex flex-col space-y-4">
          {step < totalSteps ? (
            <button 
              disabled={!isCurrentStepValid()}
              onClick={handleNext}
              className={`w-full py-5 ${theme.accentBg} text-white md:text-black text-xs uppercase tracking-[0.2em] font-black hover:opacity-90 transition-all disabled:opacity-20 flex items-center justify-center space-x-3`}
            >
              <span>Continuar</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className={`w-full py-6 ${theme.accentBg} text-white md:text-black text-[10px] uppercase tracking-[0.3em] font-black hover:opacity-90 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.3)] group overflow-hidden relative`}
            >
              <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <span className="relative z-10">Enviar para Concierge</span>
            </button>
          )}

          <div className="flex justify-between items-center">
            {step > 1 ? (
              <button 
                onClick={handleBack}
                className="text-[10px] opacity-40 uppercase tracking-widest hover:opacity-100 transition-colors flex items-center space-x-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Voltar</span>
              </button>
            ) : <div />}
            
            <button 
              onClick={onClose}
              className="text-[10px] opacity-20 uppercase tracking-widest hover:opacity-100 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes step-in {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-step-in {
          animation: step-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CheckoutForm;
