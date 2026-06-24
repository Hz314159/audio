export const lectures = [
  {
    id: 'lab-1-python-audio-basics',
    number: 1,
    title: 'Lab 1: Python Audio Basics',
    sourceStatus: 'sample-from-uploaded-notebook',
    sourceNote: 'هذه صفحة نموذجية مبنية على Notebook: Lab 1 Python Audio Basics.ipynb. راجع الملف الأصلي دائماً قبل الامتحان.',
    topics: [
      'Loading audio using librosa',
      'Audio playback with IPython.display.Audio',
      'Waveform visualization',
      'Sampling-rate effect',
      'Sine and complex signal generation',
      'Linear chirp generation',
      'Saving audio files with soundfile',
    ],
    difficulty: 'سهل إلى متوسط',
    estimatedTime: '75-100 دقيقة',
    objectives: [
      'تحميل ملف صوتي وتحويله إلى time series باستخدام librosa.',
      'قراءة sampling rate وعدد العينات ومدة الملف وقيم amplitude.',
      'رسم waveform كاملة ومقطع zoom لأول 1000 عينة.',
      'فهم تأثير تغيير sampling rate على عدد العينات وجودة الصوت.',
      'توليد pure sine tone و complex tone و linear chirp.',
      'حفظ الإشارات الصوتية الجديدة بصيغة wav باستخدام soundfile.',
    ],
    prerequisites: [
      'أساسيات Python arrays و functions.',
      'مفهوم بسيط عن الموجة: amplitude, frequency, phase.',
      'فهم أن الصوت الرقمي عبارة عن عينات sampled over time.',
    ],
    keyTerms: [
      'audio time series',
      'sampling rate sr',
      'sampling interval Ts = 1/sr',
      'amplitude',
      'waveform',
      'pure tone',
      'complex tone',
      'linear chirp',
      'clipping',
      'normalization',
    ],
    outcomes: [
      'تميّز بين تحميل الملف بمعدل عينة افتراضي وبين sr=None.',
      'تفسر لماذا الصوت يصبح أسرع أو أبطأ عند تشغيل array مع rate مختلف.',
      'تشرح لماذا تقليل sampling rate يقلل temporal resolution.',
      'تكتب functions لتوليد sine و complex signal و chirp.',
      'تعرف متى يجب normalization قبل حفظ الإشارة.',
    ],
    sections: [
      {
        id: 'imports',
        title: 'استيراد المكتبات المطلوبة',
        original: 'المحاضرة تبدأ باستيراد numpy و matplotlib و soundfile و librosa و Audio من IPython.display و chirp من scipy.signal.',
        simple: 'هذه المكتبات هي أدوات العمل الأساسية: numpy للحسابات، matplotlib للرسم، librosa لتحميل وتحليل الصوت، Audio لتشغيل الصوت داخل Notebook، و soundfile لحفظ ملفات wav.',
        examples: [
          'np يستخدم لإنشاء arrays وحساب max/min/sin.',
          'plt يستخدم لرسم waveform.',
          'librosa.load يرجع الصوت على شكل array ومعدل العينة sr.',
        ],
        whyImportant: 'أي سؤال عملي غالباً يبدأ من هذه imports. إذا نسيت import معيّن سيظهر NameError حتى لو الكود نفسه صحيح.',
        commonMistake: 'كتابة librosa.load بدون تثبيت/استيراد librosa، أو استخدام Audio(data=audio) بدون تمرير rate عندما يكون data عبارة عن array.',
        examNote: 'قد يأتي سؤال: ما وظيفة كل مكتبة؟ أو لماذا نحتاج sr مع Audio عندما نمرر audio array؟',
      },
      {
        id: 'loading-audio',
        title: 'تحميل ملف صوتي باستخدام librosa.load',
        original: 'librosa.load(path, sr=22050, duration=None) يحمل ملف صوتي كـ floating point time series. المخرجات هي y و sr.',
        simple: 'عند تحميل الصوت، يتحول الملف إلى قائمة أرقام. كل رقم يمثل amplitude عند لحظة زمنية معينة. sr يحدد كم عينة نأخذ في الثانية. الافتراضي في librosa هو 22050 Hz إذا لم تحدد قيمة أخرى.',
        examples: [
          'audio, sr = librosa.load(audio_path) يحمل الملف ويعيد sampling rate الافتراضي 22050 غالباً.',
          'librosa.load(audio_path, sr=None) يحافظ على sampling rate الأصلي للملف.',
          'duration=5 يعني تحميل أول 5 ثوان فقط.',
        ],
        whyImportant: 'كل العمليات اللاحقة تعتمد على audio و sr: مدة الصوت = len(audio) / sr، و Ts = 1 / sr.',
        commonMistake: 'اعتبار sr مجرد رقم للعرض فقط. في الحقيقة sr يدخل في حساب الزمن، الرسم، التشغيل، وحفظ الملف.',
        examNote: 'احفظ: output من librosa.load هو y ثم sr، وليس العكس.',
      },
      {
        id: 'audio-playback',
        title: 'تشغيل الصوت داخل Notebook',
        original: 'Audio(data=None, rate=None) يشغل الصوت داخل Notebook. عندما يكون data عبارة عن audio time series يجب تمرير rate.',
        simple: 'إذا أعطيت Audio مصفوفة أرقام، يجب أن تخبره كم عينة في الثانية. بدون rate لا يعرف الزمن الحقيقي للصوت. أما إذا أعطيته file path، فالملف نفسه يحتوي معلومات التشغيل.',
        examples: [
          'Audio(data=audio, rate=sr) يشغل المصفوفة بمعدلها الصحيح.',
          'Audio(audio, rate=sr*2) يجعل التشغيل أسرع لأننا نقول له: اقرأ عينات أكثر في كل ثانية.',
          'Audio(audio, rate=sr//2) يجعل التشغيل أبطأ.',
        ],
        whyImportant: 'هذا يختبر فهم العلاقة بين samples و sampling rate والزمن.',
        commonMistake: 'الخلط بين تغيير جودة الملف فعلياً وبين تغيير rate وقت التشغيل فقط. عند تشغيل نفس array بمعدل مختلف فأنت تغير تفسير الزمن.',
        examNote: 'سؤال شائع: ماذا يحدث للمدة إذا شغلت audio array بمعدل عينة أعلى؟ الإجابة: تقل المدة ويصبح الصوت أسرع.',
      },
      {
        id: 'visualization',
        title: 'رسم waveform وتمثيل الزمن',
        original: 'المحاضرة تنشئ time array باستخدام np.linspace ثم ترسم waveform كاملة، وبعدها ترسم أول 1000 sample كتكبير.',
        simple: 'الرسم الكامل يعطيك شكل الصوت عبر الزمن، أما zoom لأول 1000 عينة فيكشف التفاصيل الدقيقة التي قد لا تظهر في الرسم الكامل.',
        examples: [
          'time = np.linspace(0, int(len(audio)/sr), len(audio)) ينشئ محور الزمن.',
          'axes[0].plot(time, audio) يرسم amplitude مقابل الزمن.',
          'axes[1].plot(audio[:1000]) يرسم أول 1000 عينة مقابل sample index.',
        ],
        whyImportant: 'Audio processing لا يعتمد على السماع فقط. يجب أن تعرف كيف تقرأ waveform وتربطها بالزمن والـ amplitude.',
        commonMistake: 'رسم audio بدون محور زمن ثم تفسير x-axis كثواني. إذا لم تستخدم time array فالـ x-axis هو sample index.',
        examNote: 'قد يُطلب منك الفرق بين time axis و sample index axis.',
      },
      {
        id: 'sampling-rate-effect',
        title: 'تأثير Sampling Rate',
        original: 'عند تحميل الصوت بمعدلات 44100 و 8000 و 4000 Hz، يقل عدد العينات عند المعدل الأقل، وتقل temporal resolution ويصبح الشكل أقل دقة.',
        simple: 'sampling rate يعني عدد اللقطات الصوتية في الثانية. كلما قلّ، تصبح المسافة الزمنية بين العينات أكبر، وبالتالي تفقد تفاصيل من الصوت.',
        examples: [
          '44100 Hz يعطي تفاصيل أكثر من 8000 Hz.',
          '4000 Hz قد يجعل waveform أكثر jagged وبعض peaks تختفي.',
          'Ts = 1/sr، لذلك عندما sr يقل فإن Ts يزيد.',
        ],
        whyImportant: 'هذا أساس جودة الصوت والتحليل. أي feature أو رسم أو FFT لاحقاً يتأثر بالـ sr.',
        commonMistake: 'قول إن مدة الصوت يجب أن تتغير عند resampling. إذا تم resampling بشكل صحيح فمدة الملف الأصلية تبقى تقريباً ثابتة، لكن عدد العينات يتغير.',
        examNote: 'احفظ آثار تقليل sampling rate: عدد عينات أقل، temporal resolution أقل، waveform أقل دقة، جودة أقل.',
      },
      {
        id: 'sine-complex',
        title: 'توليد Sine Signal و Complex Signal',
        original: 'المحاضرة تعرض x(t)=A sin(2πft+φ)، ثم signal مركب من مجموع N sine signals.',
        simple: 'pure tone هو موجة جيبية واحدة لها frequency و amplitude و phase. complex tone هو جمع عدة موجات جيبية، لذلك يحتوي أكثر من frequency في نفس الوقت.',
        examples: [
          'generate_sine(66, 0.7) يولد tone بتردد 66 Hz وسعة 0.7.',
          'جمع 66 و120 و240 Hz ينتج complex signal.',
          'normalization يمنع clipping عند حفظ أو تشغيل الإشارة.',
        ],
        whyImportant: 'الصوت الحقيقي غالباً ليس pure tone، بل مزيج من ترددات متعددة. هذه الفكرة ستظهر لاحقاً في FFT.',
        commonMistake: 'جمع عدة موجات بدون normalization قد يجعل amplitude تتجاوز المجال الآمن [-1, 1].',
        examNote: 'قد يأتي سؤال formula: x(t)=A sin(2πft+φ)، أو ما الفرق بين pure و complex tone؟',
      },
      {
        id: 'linear-chirp',
        title: 'توليد Linear Chirp',
        original: 'linear chirp له تردد يتغير خطياً مع الزمن: f(t)=at+b، وتستخدم المحاضرة دالة تولد chirp من f_start إلى f_end.',
        simple: 'chirp ليس تردداً ثابتاً. يبدأ من تردد معين ثم يتحرك تدريجياً إلى تردد آخر خلال مدة محددة. لذلك تسمع صوتاً يصعد أو يهبط في pitch.',
        examples: [
          'generate_chirp(100, 2000) يبدأ من 100 Hz ويتجه إلى 2000 Hz خلال ثانيتين.',
          'r = (f_end - f_start) / duration هو معدل تغير التردد.',
          'يمكن استخدام scipy.signal.chirp كبديل جاهز.',
        ],
        whyImportant: 'chirp مفيد لاختبار أنظمة الصوت لأنه يغطي range من الترددات خلال زمن قصير.',
        commonMistake: 'اعتبار chirp مجرد sine عادي. الفرق أن frequency في chirp ليست ثابتة.',
        examNote: 'ركز على f_start و f_end و duration، وعلى معنى أن f(t) خطية.',
      },
      {
        id: 'saving-audio',
        title: 'حفظ ملف صوتي باستخدام soundfile.write',
        original: 'sf.write(path, data, sr) يكتب audio signal إلى ملف صوتي. استخدمته المحاضرة لحفظ complex_wave.wav و chirp.wav.',
        simple: 'بعد أن تولد signal في Python، يمكنك حفظها كملف wav. يجب تمرير path و data و sampling rate الصحيح حتى يستطيع أي مشغل صوتي تشغيل الملف بالمدة الصحيحة.',
        examples: [
          "sf.write('../Audio Files/complex_wave.wav', complex_signal, sr)",
          "sf.write('../Audio Files/chirp.wav', x, sr)",
        ],
        whyImportant: 'الحفظ يحوّل التجربة من array داخل Notebook إلى ملف صوتي قابل للاستخدام في labs لاحقة.',
        commonMistake: 'حفظ signal مع sr غلط يؤدي إلى ملف مدته أو pitch فيه غير صحيح.',
        examNote: 'الدالة تحتاج path ثم data ثم sr بهذا الترتيب.',
      },
    ],
    detailedExamples: [
      {
        title: 'قراءة معلومات الملف الصوتي',
        problem: 'نريد معرفة sampling rate والمدة وعدد العينات و max/min amplitude.',
        steps: [
          'نحدد audio_path.',
          'نستخدم librosa.load للحصول على audio و sr.',
          'نحسب duration باستخدام len(audio) / sr.',
          'نستخدم np.max و np.min لمعرفة مدى amplitude.',
        ],
        result: 'تحصل على وصف رقمي للصوت، وهذا يساعدك قبل أي رسم أو تحليل.',
        diagramDescription: 'تخيل الصوت كصف طويل من النقاط. sr يحدد عدد النقاط في كل ثانية، و amplitude هي ارتفاع كل نقطة.',
      },
      {
        title: 'مقارنة sampling rates مختلفة',
        problem: 'نريد رؤية كيف تتغير waveform عند 44100 و8000 و4000 Hz.',
        steps: [
          'نحمّل نفس الملف عدة مرات بقيم sr مختلفة.',
          'نرسم waveform كاملة لكل sr.',
          'نرسم أول 30 ms للتكبير.',
          'نقارن smoothness وعدد التفاصيل.',
        ],
        result: 'كلما قلّ sr أصبحت التفاصيل الزمنية أقل وقد تختفي بعض القمم.',
        diagramDescription: 'في الرسم، الصف الأيسر waveform كاملة، والصف الأيمن zoom لأول 30 ms. الأقل sr يظهر أكثر خشونة.',
      },
      {
        title: 'توليد complex signal من ثلاث موجات',
        problem: 'نريد صوتاً مركباً من 66 و120 و240 Hz.',
        steps: [
          'نولد كل sine signal منفصلة.',
          'نجمع الإشارات الثلاثة sample-by-sample.',
          'نقسم الناتج على أكبر absolute value لمنع clipping.',
          'نرسم الإشارات الفردية والمجموع.',
        ],
        result: 'الناتج waveform أكثر تعقيداً من sine منفردة لأنه يحتوي ثلاث ترددات.',
        diagramDescription: 'الرسم الأول يعرض ثلاث موجات منفصلة، والثاني يعرض مجموعها في waveform واحدة.',
      },
    ],
    codeExamples: [
      {
        id: 'load-audio',
        title: 'تحميل الصوت وعرض معلوماته',
        language: 'python',
        code: String.raw`# Load an audio file
import numpy as np
import librosa

audio_path = '../Audio Files/audio1.wav'
audio, sr = librosa.load(audio_path)

print(f"Sampling rate: {sr} Hz")
print(f"Sampling interval: {1/sr:.5f} s")
print(f"Duration: {int(len(audio)/sr)} s")
print(f"Number of samples: {len(audio)}")
print(f"Max amplitude: {np.max(audio):.5f}")
print(f"Min amplitude: {np.min(audio):.5f}")
print(f"Audio dtype: {audio.dtype}")
print(f"Audio shape: {audio.shape}")`,
        explanation: [
          'import numpy as np: نحتاج numpy لحساب max/min والتعامل مع arrays.',
          'import librosa: المكتبة المسؤولة عن تحميل الملف الصوتي كـ time series.',
          'audio_path: مسار الملف الصوتي.',
          'audio, sr = librosa.load(audio_path): يرجع المصفوفة الصوتية ومعدل العينة.',
          '1/sr: sampling interval، أي الزمن بين عينتين متتاليتين.',
          'len(audio)/sr: مدة الصوت بالثواني.',
          'np.max/np.min: أعلى وأقل amplitude.',
          'dtype و shape: نوع البيانات وشكل المصفوفة.',
        ],
        commonMistakes: [
          'نسيان أن librosa.load يعيد audio ثم sr.',
          'استخدام int(len(audio)/sr) يفقد الأجزاء العشرية من المدة. للعرض الدقيق استخدم len(audio)/sr.',
          'اعتبار max/min هما volume فقط. هما يمثلان حدود amplitude الرقمية.',
        ],
        expectedOutput: 'قيم مثل Sampling rate وDuration وNumber of samples. الأرقام تختلف حسب الملف.',
        whenToUse: 'استخدم هذا النمط في بداية أي تحليل صوتي للتأكد من خصائص الملف.',
      },
      {
        id: 'visualize-waveform',
        title: 'رسم waveform كاملة و zoom لأول 1000 sample',
        language: 'python',
        code: String.raw`import numpy as np
import matplotlib.pyplot as plt

time = np.linspace(0, int(len(audio)/sr), len(audio))
fig, axes = plt.subplots(2, 1, figsize=(14, 8))

axes[0].plot(time, audio)
axes[0].set_title('Audio Waveform')
axes[0].set_xlabel('Time (seconds)')
axes[0].set_ylabel('Amplitude')
axes[0].grid(True, alpha=0.3)

axes[1].plot(audio[:1000])
axes[1].set_title('First 1000 Samples (Zoomed)')
axes[1].set_xlabel('Sample Index')
axes[1].set_ylabel('Amplitude')
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()`,
        explanation: [
          'np.linspace ينشئ محور الزمن بنفس طول audio.',
          'plt.subplots(2,1) ينشئ رسمين فوق بعض.',
          'الرسم الأول يعرض الصوت كله مقابل الزمن.',
          'الرسم الثاني يعرض أول 1000 عينة فقط، لذلك x-axis هو sample index.',
          'tight_layout يمنع تداخل العناوين والمحاور.',
        ],
        commonMistakes: [
          'استخدام time كامل مع audio[:1000] سيعطي خطأ في الأبعاد.',
          'تسمية x-axis بالثواني في الرسم الثاني رغم أنه sample index.',
        ],
        expectedOutput: 'رسمان: waveform كاملة، ورسم مكبر لأول 1000 sample.',
        whenToUse: 'عندما تحتاج فحص شكل الإشارة بصرياً قبل التحليل.',
      },
      {
        id: 'generate-signals',
        title: 'توليد sine و complex signal',
        language: 'python',
        code: String.raw`import numpy as np

def generate_sine(frequency, amplitude, phase=0, duration=5, sr=22050):
    t = np.linspace(0, duration, int(sr * duration))
    signal = amplitude * np.sin(2 * np.pi * frequency * t + phase)
    return t, signal, sr

def generate_complex_signal(freqs, amps, phases=None, duration=5, sr=22050):
    if phases is None:
        phases = [0] * len(freqs)

    t = np.linspace(0, duration, int(sr * duration))
    signal = np.zeros_like(t)

    for i in range(len(freqs)):
        signal += amps[i] * np.sin(2 * np.pi * freqs[i] * t + phases[i])

    signal = signal / np.max(np.abs(signal))
    return t, signal, sr`,
        explanation: [
          'generate_sine يبني time array ثم يطبق formula الخاصة بالـ sine.',
          'frequency تحدد عدد الدورات في الثانية.',
          'amplitude تحدد ارتفاع الموجة.',
          'phase تحرك الموجة أفقياً.',
          'generate_complex_signal يبدأ بإشارة zeros ثم يجمع عدة sine waves.',
          'normalization يجعل أكبر absolute amplitude تساوي 1 تقريباً.',
        ],
        commonMistakes: [
          'استخدام phases == None يعمل غالباً، لكن الأفضل Pythonياً هو phases is None.',
          'عدم التأكد أن len(freqs) يساوي len(amps).',
          'نسيان normalization عند جمع amplitudes كبيرة.',
        ],
        expectedOutput: 'functions ترجع t و signal و sr، ويمكن تشغيل signal أو رسمها أو حفظها.',
        whenToUse: 'عند إنشاء test signals لفهم الصوت قبل التعامل مع ملفات حقيقية.',
      },
      {
        id: 'generate-chirp-save',
        title: 'توليد Linear Chirp وحفظه',
        language: 'python',
        code: String.raw`import numpy as np
import soundfile as sf

def generate_chirp(f_start, f_end, duration=2, sr=22050):
    t = np.linspace(0, duration, int(duration * sr))
    r = (f_end - f_start) / duration
    x = np.sin(2 * np.pi * (f_start + r * t) * t)
    return t, x, sr

t, x, sr = generate_chirp(100, 2000)
sf.write('../Audio Files/chirp.wav', x, sr)`,
        explanation: [
          'f_start هو التردد في البداية.',
          'f_end هو التردد في النهاية.',
          'r يحسب معدل تغير التردد في الثانية.',
          'x هو signal الناتج.',
          'sf.write يحفظ الإشارة في ملف wav باستخدام sr.',
        ],
        commonMistakes: [
          'خلط chirp مع sine ثابت التردد.',
          'حفظ الملف بمعدل عينة مختلف عن المستخدم في التوليد.',
        ],
        expectedOutput: 'ملف chirp.wav وصوت يتغير pitch فيه تدريجياً من منخفض إلى أعلى.',
        whenToUse: 'عند اختبار response لنطاق ترددات متغير أو شرح time-varying frequency.',
      },
    ],
    summary: {
      definitions: [
        'Audio time series: تمثيل الصوت كمصفوفة samples.',
        'Sampling rate: عدد العينات في الثانية، ويقاس Hz.',
        'Sampling interval: الزمن بين عينتين Ts = 1/sr.',
        'Waveform: رسم amplitude مقابل الزمن أو sample index.',
        'Pure tone: sine wave بتردد واحد.',
        'Complex tone: مجموع عدة sine waves.',
        'Linear chirp: إشارة ترددها يتغير خطياً مع الزمن.',
      ],
      rules: [
        'Duration = len(audio) / sr.',
        'Higher sr يعني temporal resolution أعلى.',
        'Lower sr يعني عينات أقل وجودة وتفاصيل أقل.',
        'عند تشغيل array، rate يؤثر على سرعة ومدة التشغيل.',
        'عند تشغيل file path، معلومات الملف تتحكم في التشغيل.',
        'بعد جمع signals متعددة، استخدم normalization لتجنب clipping.',
      ],
      comparisons: [
        { left: 'Audio array', right: 'File path', point: 'array يحتاج rate عند التشغيل؛ file path يحمل metadata.' },
        { left: 'Pure tone', right: 'Complex tone', point: 'pure يحتوي frequency واحد؛ complex يحتوي عدة frequencies.' },
        { left: 'High sr', right: 'Low sr', point: 'high أدق وأكثر samples؛ low أقل جودة وتفاصيل.' },
      ],
      formulas: [
        'Ts = 1 / sr',
        'Duration = Number of samples / sr',
        'x(t) = A sin(2πft + φ)',
        'x(t) = Σ Ai sin(2π fi t + φi)',
        'f(t) = at + b للـ linear chirp',
      ],
      commonMistakes: [
        'نسيان sr عند تشغيل audio array.',
        'تفسير sample index كأنه seconds.',
        'اعتبار تقليل sr مجرد تقليل حجم فقط، مع أنه يقلل temporal resolution أيضاً.',
        'حفظ signal بدون normalization عندما يكون amplitude خارج [-1,1].',
      ],
      examNotes: [
        'احفظ مخرجات librosa.load: y ثم sr.',
        'احفظ تأثير تغيير rate في Audio على مدة playback.',
        'احفظ آثار تقليل sampling rate المذكورة في المحاضرة.',
        'افهم الفرق بين sine ثابت و chirp متغير التردد.',
      ],
    },
    quiz: [
      {
        question: 'ما الذي ترجعه دالة librosa.load عادة؟',
        options: ['sr فقط', 'audio فقط', 'audio time series و sampling rate', 'path و duration'],
        answerIndex: 2,
        explanation: 'librosa.load ترجع y/audio كمصفوفة و sr كمعدل عينة.',
      },
      {
        question: 'ما معنى sr؟',
        options: ['عدد القنوات', 'عدد العينات في الثانية', 'أعلى amplitude', 'مدة الصوت'],
        answerIndex: 1,
        explanation: 'sr هو sampling rate ويقاس بالـ Hz.',
      },
      {
        question: 'إذا شغلت نفس audio array بمعدل sr*2 ماذا يحدث غالباً؟',
        options: ['يصبح أبطأ', 'يصبح أسرع ومدته أقل', 'لا يتغير شيء', 'يصبح stereo'],
        answerIndex: 1,
        explanation: 'نفس عدد العينات يتم تشغيله على عدد أكبر من العينات في الثانية، فتقل المدة.',
      },
      {
        question: 'ما العلاقة الصحيحة لحساب مدة الصوت؟',
        options: ['sr / len(audio)', 'len(audio) / sr', 'sr * len(audio)', 'max(audio) / sr'],
        answerIndex: 1,
        explanation: 'المدة بالثواني = عدد العينات / عدد العينات في الثانية.',
      },
      {
        question: 'ماذا يحدث عند تقليل sampling rate؟',
        options: ['يزيد عدد العينات', 'تزيد temporal resolution', 'تقل التفاصيل وقد تصبح waveform أكثر خشونة', 'تصبح amplitude دائماً أكبر'],
        answerIndex: 2,
        explanation: 'تقليل sr يقلل عدد العينات في الثانية، لذلك يقل الوضوح الزمني.',
      },
      {
        question: 'ما formula الخاصة بـ sine signal؟',
        options: ['x(t)=A sin(2πft+φ)', 'x(t)=A+f+t', 'x(t)=sr/len(audio)', 'x(t)=log(f)'],
        answerIndex: 0,
        explanation: 'المحاضرة تستخدم x(t)=A sin(2πft+φ).',
      },
      {
        question: 'ما الفرق الأساسي بين pure tone و complex tone؟',
        options: ['pure فيه عدة ترددات', 'complex هو مجموع عدة sine waves', 'pure لا يمكن تشغيله', 'complex ليس له amplitude'],
        answerIndex: 1,
        explanation: 'complex tone ينتج من جمع أكثر من sine signal.',
      },
      {
        question: 'لماذا نستخدم normalization بعد جمع عدة sine waves؟',
        options: ['لزيادة duration', 'لتغيير sr', 'لتجنب clipping', 'لحذف phase'],
        answerIndex: 2,
        explanation: 'جمع amplitudes قد يجعل الإشارة تتجاوز المجال الآمن، لذلك نطبعها normalize.',
      },
      {
        question: 'ما الخاصية المميزة للـ linear chirp؟',
        options: ['amplitude دائماً صفر', 'frequency ثابتة دائماً', 'frequency تتغير خطياً مع الزمن', 'لا يمكن حفظه كملف wav'],
        answerIndex: 2,
        explanation: 'في chirp، f(t) تتغير مع الزمن، وفي linear chirp يكون التغير خطياً.',
      },
      {
        question: 'ما وظيفة sf.write(path, data, sr)؟',
        options: ['رسم waveform', 'حفظ audio signal في ملف', 'حساب max amplitude فقط', 'تحميل ملف باستخدام librosa'],
        answerIndex: 1,
        explanation: 'soundfile.write يحفظ الإشارة الرقمية في ملف صوتي.',
      },
    ],
    examQuestions: [
      {
        type: 'Short answer',
        question: 'عرّف sampling rate و sampling interval.',
        modelAnswer: 'sampling rate هو عدد العينات في الثانية ويقاس Hz. sampling interval هو الزمن بين عينتين متتاليتين ويساوي Ts = 1/sr.',
      },
      {
        type: 'Explain',
        question: 'اشرح لماذا تقل جودة الصوت عند تقليل sampling rate.',
        modelAnswer: 'لأن عدد العينات في الثانية يقل، فتقل temporal resolution وتختفي بعض التفاصيل والقمم، ويصبح تمثيل waveform أقل دقة.',
      },
      {
        type: 'Compare',
        question: 'قارن بين تشغيل Audio باستخدام audio array وتشغيله باستخدام file path.',
        modelAnswer: 'عند تمرير audio array يجب تحديد rate، وتغيير rate يغير مدة وسرعة التشغيل. عند تمرير file path يعتمد التشغيل على metadata داخل الملف وتبقى المدة ثابتة غالباً.',
      },
      {
        type: 'What is the output?',
        question: 'إذا كان len(audio)=44100 و sr=22050، ما مدة الصوت؟',
        modelAnswer: 'Duration = 44100 / 22050 = 2 seconds.',
      },
      {
        type: 'Code understanding',
        question: 'ماذا تفعل signal = signal / np.max(np.abs(signal))؟',
        modelAnswer: 'تعمل normalization للإشارة بحيث يصبح أكبر absolute amplitude يساوي 1 تقريباً، وهذا يساعد على منع clipping.',
      },
      {
        type: 'Formula',
        question: 'اكتب معادلة sine signal واشرح رموزها.',
        modelAnswer: 'x(t)=A sin(2πft+φ). A هي amplitude، f التردد، t الزمن، و φ phase.',
      },
    ],
    practicalExercises: [
      {
        label: 'تمرين إضافي من إعداد الذكاء الاصطناعي',
        task: 'اكتب كوداً يحمل audio file باستخدام sr=None ثم اطبع sr الأصلي والمدة الدقيقة بدون int.',
        hint: 'استخدم duration = len(audio) / sr.',
      },
      {
        label: 'تمرين إضافي من إعداد الذكاء الاصطناعي',
        task: 'ولّد pure tone بتردد 440 Hz وسعة 0.5 لمدة 3 ثوان، ثم شغله داخل Notebook.',
        hint: 'استخدم generate_sine ثم Audio(signal, rate=sr).',
      },
      {
        label: 'تمرين إضافي من إعداد الذكاء الاصطناعي',
        task: 'ولّد complex signal من الترددات 100 و300 و700 Hz، ثم احفظه باسم test_complex.wav.',
        hint: 'تأكد من normalization قبل sf.write.',
      },
      {
        label: 'تمرين إضافي من إعداد الذكاء الاصطناعي',
        task: 'ارسم أول 50 ms من أي audio file عند sr=8000 و sr=44100 وقارن بين الرسمين.',
        hint: 'عدد العينات المطلوب = int(0.05 * sr).',
      },
    ],
    cheatSheet: {
      mostImportant: [
        'librosa.load(path) → audio, sr.',
        'Default librosa sr غالباً 22050 إذا لم تحدد sr=None.',
        'Duration = len(audio) / sr.',
        'Ts = 1 / sr.',
        'تقليل sr يقلل عدد العينات والتفاصيل.',
        'Audio array يحتاج rate عند التشغيل.',
        'Complex signal = sum of sine waves.',
        'Chirp = frequency changes over time.',
      ],
      keywords: ['librosa.load', 'Audio', 'waveform', 'sampling rate', 'sine', 'complex signal', 'chirp', 'sf.write'],
      miniExamples: [
        'audio, sr = librosa.load(path, sr=None)',
        'Audio(data=audio, rate=sr)',
        'time = np.arange(len(audio)) / sr',
        'sf.write(path, signal, sr)',
      ],
      warnings: [
        'لا تخلط بين sample index والزمن.',
        'لا تحفظ signal بمعدل عينة خطأ.',
        'لا تنس normalization عند جمع signals.',
        'لا تعتبر التمارين الإضافية جزءاً من المحاضرة الأصلية.',
      ],
      likelyExam: [
        'تعريف sr و Ts.',
        'تأثير تغيير sampling rate.',
        'مخرجات librosa.load.',
        'شرح كود generate_sine أو generate_complex_signal.',
        'الفرق بين array playback و file path playback.',
      ],
    },
  },
  {
  "id": "lab-2-3-4-frequency-time-frequency",
  "number": 2,
  "title": "Lab 2+3+4: Frequency-Domain and Time-Frequency Domain Processing",
  "sourceStatus": "sample-from-uploaded-notebook",
  "sourceNote": "صفحة نموذجية مبنية على Notebook: Lab 2+3+4 Frequency-Domain and Time-Frequency Domain Processing.ipynb. راجع الملف الأصلي دائماً قبل الامتحان.",
  "topics": [
    "FFT",
    "DFT",
    "Spectrum Analysis",
    "Dominant Frequencies",
    "STFT",
    "Spectrogram",
    "Window/Hop Effects",
    "HPSS",
    "Median Filters"
  ],
  "difficulty": "متوسط إلى صعب",
  "estimatedTime": "4-6 ساعات",
  "objectives": [
    "فهم FFT وDFT وfrequency bins.",
    "استخراج dominant frequencies.",
    "قراءة spectrogram.",
    "شرح trade-off بين n_fft وhop_length.",
    "فهم HPSS يدوياً وبـlibrosa."
  ],
  "prerequisites": [
    "Lab 1: sr/waveform/audio array.",
    "أساسيات sine waves.",
    "NumPy وmatplotlib."
  ],
  "keyTerms": [
    "FFT",
    "DFT",
    "Nyquist",
    "STFT",
    "Spectrogram",
    "n_fft",
    "hop_length",
    "HPSS",
    "Median filter"
  ],
  "outcomes": [
    "تفسر spectrum وتحدد القمم.",
    "تحسب Δf وNyquist.",
    "تقرأ spectrogram ومحاوره.",
    "تشرح harmonic/percussive masks."
  ],
  "sections": [
    {
      "id": "imports",
      "title": "خريطة اللاب والمكتبات",
      "original": "النص الأصلي يقول: اللاب يبدأ بـ FFT computation/spectrum analysis، ثم STFT/spectrogram، ثم HPSS. ويستخدم numpy وmatplotlib وlibrosa وscipy.fft وscipy.signal.medfilt وAudio/display.",
      "simple": "الترتيب مهم: أولاً نفهم الصوت كترددات، ثم كترددات تتغير مع الزمن، ثم نفصل harmonic/percussive. المكتبات ليست عشوائية: librosa للصوت، scipy للـ FFT والـ median filter، matplotlib للرسم.",
      "examples": [
        "numpy للحسابات، librosa.load وlibrosa.stft للتحليل، specshow للرسم، medfilt للـ HPSS."
      ],
      "whyImportant": "يساعدك على توقع pipeline أي سؤال عملي.",
      "commonMistake": "حفظ أسماء المكتبات بدون معرفة وظيفة كل واحدة.",
      "examNote": "قد يأتي سؤال: أي import نحتاجه لـ fftfreq أو medfilt؟"
    },
    {
      "id": "time-vs-frequency",
      "title": "Time Domain vs Frequency Domain",
      "original": "النص الأصلي يقول: time-domain يصف تغير amplitude مع الزمن، وfrequency-domain يوضح الترددات التي تكوّن الإشارة وقوة كل تردد.",
      "simple": "في الزمن ترى شكل الموجة فقط. في التردد ترى النغمات/المكونات الداخلية. لذلك قد تكون waveform معقدة لكن spectrum يكشف قمماً واضحة.",
      "examples": [
        "موجة فيها 120Hz و240Hz تظهر في spectrum كقمم عند هذه الترددات."
      ],
      "whyImportant": "هذه بداية فهم FFT وكل ما بعدها.",
      "commonMistake": "اعتبار frequency-domain يعرض الزمن؛ هو لا يحدد متى ظهر كل تردد.",
      "examNote": "قارن بين domainين بذكر المحور والمعلومة التي يقدمها كل واحد."
    },
    {
      "id": "dft-fft",
      "title": "DFT و FFT و Frequency Bins",
      "original": "النص الأصلي يعطي DFT: X[k]=Σx[n]e^{-i2πkn/N}=|X[k]|e^{j angle X[k]}. وللإشارات الحقيقية X[k]=X*[N-k]. كما يعطي f_k=kfs/N و Δf=fs/N.",
      "simple": "DFT يحول samples إلى bins ترددية. FFT هي طريقة أسرع لحساب DFT. كل bin له تردد وقيمة مركبة، نأخذ magnitude للقوة وphase للإزاحة.",
      "examples": [
        "إذا fs=22050 وN=110250 إذن Δf=0.20Hz."
      ],
      "whyImportant": "بدون فهم bins لن تفهم لماذا القمة تظهر عند تردد محدد.",
      "commonMistake": "رسم ناتج FFT المركب مباشرة بدلاً من magnitude.",
      "examNote": "احفظ Δf=fs/N وسبب استخدام النصف الموجب فقط."
    },
    {
      "id": "nyquist",
      "title": "Nyquist Frequency",
      "original": "النص الأصلي يقول: sampling frequency يجب أن تكون على الأقل ضعف أعلى تردد: 2*fmax <= fs، وNyquist frequency هي fs/2.",
      "simple": "أعلى تردد يمكن تمثيله بأمان هو نصف sample rate. إذا تجاوزت الإشارة ذلك يحدث aliasing.",
      "examples": [
        "sr=44100Hz يعني Nyquist=22050Hz."
      ],
      "whyImportant": "قاعدة أساسية في الصوت الرقمي والتحليل الطيفي.",
      "commonMistake": "الخلط بين sample rate وNyquist.",
      "examNote": "علاقة fs >= 2fmax مباشرة ومهمة."
    },
    {
      "id": "compute-fft",
      "title": "دالة compute_fft",
      "original": "النص الأصلي يحسب n_fft=len(signal)، ثم fft(signal)، ثم fftfreq، ثم يحتفظ بالترددات الموجبة ويحسب magnitude=np.abs وphase=np.angle.",
      "simple": "الدالة تأخذ waveform وترجع ترددات وقوة وphase. positive_idx مهم لأن الصوت الحقيقي يعطي spectrum متماثلاً.",
      "examples": [
        "magnitude هو ما نرسمه غالباً، وليس fft_result نفسه."
      ],
      "whyImportant": "قالب أساسي لأي سؤال spectrum/dominant frequency.",
      "commonMistake": "نسيان sample_rate داخل fftfreq أو عدم فلترة السالب.",
      "examNote": "قد يعطيك الامتحان دالة ناقصة وتكملها."
    },
    {
      "id": "dominant",
      "title": "Dominant Frequencies",
      "original": "النص الأصلي يستخدم np.argsort(mag)[-num_peaks:] ثم يعكس الترتيب [::-1] لإرجاع أقوى القمم.",
      "simple": "أكبر magnitude تعني أن التردد أكثر حضوراً في الصوت. argsort يعطينا مواقع القيم الأقوى.",
      "examples": [
        "complex_wave أعطى قمماً حول 120Hz و66Hz و240Hz."
      ],
      "whyImportant": "يلخص spectrum في أرقام سهلة للمقارنة.",
      "commonMistake": "استخدام أول عناصر argsort فيرجع أضعف القيم.",
      "examNote": "اشرح لماذا نستخدم [-num_peaks:] ثم [::-1]."
    },
    {
      "id": "complex-wave",
      "title": "مثال complex_wave.wav",
      "original": "النص الأصلي يحمّل complex_wave.wav. النتائج: duration=5.00s، sr=22050Hz، FFT size=110250، frequency resolution=0.20Hz، والقمم 120Hz و66Hz و240Hz.",
      "simple": "هذا مثال واضح لأن المكونات معروفة تقريباً. waveform وحدها لا توضح كل شيء، بينما spectrum يكشف الترددات المسيطرة.",
      "examples": [
        "Δf=22050/110250=0.20Hz."
      ],
      "whyImportant": "يربط المعادلات بنتيجة عملية.",
      "commonMistake": "الخلط بين قيمة peak على محور y والتردد على محور x.",
      "examNote": "القيم المطبوعة مرشحة لسؤال output."
    },
    {
      "id": "real-audio",
      "title": "مثال audio1.wav",
      "original": "النص الأصلي يحمّل audio1.wav، duration=2s، sr=44100Hz، FFT size=98048، resolution≈0.45Hz/bin، وأعلى القمم حول 3165-3170Hz.",
      "simple": "في الصوت الحقيقي قد تظهر قمم متقاربة حول نفس المنطقة بدلاً من قمم مثالية منفصلة؛ هذا طبيعي بسبب bins وطبيعة الصوت.",
      "examples": [
        "عدة peaks حول 3169Hz تعني نطاقاً قوياً وليس بالضرورة مصادر مختلفة."
      ],
      "whyImportant": "يعلمك تفسير spectrum حقيقي لا synthetic فقط.",
      "commonMistake": "اعتبار كل peak قريب تردداً مستقلاً مهماً.",
      "examNote": "فسر القمم المتقاربة بربطها بالدقة الترددية."
    },
    {
      "id": "stft",
      "title": "STFT و Time-Frequency",
      "original": "النص الأصلي يقول: frequency-domain لا يخبرنا متى تحدث الترددات، وtime-frequency domain يوضح تغير التردد مع الزمن. STFT يحول time-domain إلى time-frequency representation.",
      "simple": "STFT تقسم الصوت إلى نوافذ قصيرة وتحسب FFT لكل نافذة. النتيجة matrix: ترددات × frames زمنية.",
      "examples": [
        "الصوت chirp يحتاج STFT لأن تردده يتغير مع الزمن."
      ],
      "whyImportant": "معظم الأصوات الواقعية تتغير مع الزمن.",
      "commonMistake": "القول إن STFT هي FFT واحدة فقط.",
      "examNote": "قارن FFT وSTFT من حيث وجود معلومات الزمن."
    },
    {
      "id": "stft-code",
      "title": "compute_stft و Log Spectrogram",
      "original": "النص الأصلي يستخدم librosa.stft ثم magnitude=np.abs ثم librosa.amplitude_to_db(ref=np.max). شكل الخرج (1+n_fft//2, n_frames).",
      "simple": "STFT مركبة، لذلك نأخذ magnitude للرسم. التحويل إلى dB يضغط المجال الكبير ويجعل التفاصيل الضعيفة مرئية.",
      "examples": [
        "مع n_fft=1024 عدد bins=513."
      ],
      "whyImportant": "أساس رسم spectrogram وفهم features لاحقاً.",
      "commonMistake": "استخدام log_magnitude للـ istft؛ العودة للصوت تحتاج STFT مركب.",
      "examNote": "اشرح لماذا output rows = 1+n_fft//2."
    },
    {
      "id": "spectrogram",
      "title": "قراءة Spectrogram",
      "original": "النص الأصلي يرسم specshow بمحاور x_axis=time وy_axis=hz وcolorbar dB. في المثال n_fft=1024 وhop=256: window≈0.02322s، hop≈0.00580s، resolution≈43.07Hz، frames=384.",
      "simple": "المحور الأفقي زمن، الرأسي تردد، واللون قوة. اللون ليس تردداً بل مقدار الطاقة عند زمن وتردد معين.",
      "examples": [
        "sr=44100 وn_fft=1024 يعطيان Δf≈43.07Hz."
      ],
      "whyImportant": "قراءة spectrogram مهارة عملية ونظرية.",
      "commonMistake": "اعتبار اللون قيمة frequency.",
      "examNote": "قد تُسأل عن معنى كل محور وعن حساب window/hop duration."
    },
    {
      "id": "window-hop",
      "title": "Window Length و Hop Length",
      "original": "النص الأصلي يجرب n_fft=[512,1024,2048,4096] وhop_lengths=[512,128]. النتيجة: n_fft صغير يعطي time resolution أفضل وfrequency أسوأ، وn_fft كبير العكس. hop أصغر يعطي frames أكثر وزمن أدق لكن حساباً أكبر.",
      "simple": "هذه هي trade-off: لا يمكنك تحسين الزمن والتردد معاً بنفس الوقت بمجرد تكبير النافذة. hop يتحكم في كثافة الأعمدة الزمنية.",
      "examples": [
        "n_fft=4096 يميز ترددات أقرب، hop=128 يعطي spectrogram أكثر كثافة."
      ],
      "whyImportant": "من أكثر نقاط STFT امتحانياً.",
      "commonMistake": "قول إن n_fft الأكبر أفضل دائماً.",
      "examNote": "احفظ: small window=time، large window=frequency، small hop=more frames."
    },
    {
      "id": "hpss",
      "title": "HPSS: Harmonic vs Percussive",
      "original": "النص الأصلي يعرف HPSS كفصل الصوت إلى harmonic وpercussive. harmonic مستمر tonal يظهر أفقياً؛ percussive transient/noise-like يظهر عمودياً.",
      "simple": "النغمات المستمرة تبقى على نفس التردد فترة فتظهر خطوطاً أفقية. الضربات قصيرة وتغطي ترددات كثيرة فتظهر أعمدة.",
      "examples": [
        "violin/piano/flute harmonic، drums/clicks/claps percussive."
      ],
      "whyImportant": "يفسر لماذا يمكن فصل المكونين من spectrogram.",
      "commonMistake": "اعتبار harmonic يعني high frequency وpercussive يعني low frequency.",
      "examNote": "قارن بين harmonic/percussive بالشكل في spectrogram والأمثلة."
    },
    {
      "id": "median",
      "title": "Median Filter",
      "original": "النص الأصلي يشرح medfilt كفلتر يستبدل القيمة بالوسيط، kernel_size odd، مع zero padding. مثال x=[4,3,20,5,4,6,5,15,4,2,3] وkernel=5 يعطي [3,4,4,5,5,5,5,5,4,3,2].",
      "simple": "الوسيط يقلل أثر outliers. في HPSS نستخدمه أفقياً لتعزيز harmonic وعمودياً لتعزيز percussive.",
      "examples": [
        "20 و15 تقل أهميتهما بعد median."
      ],
      "whyImportant": "هو الآلية التي تبني H وP قبل masks.",
      "commonMistake": "استخدام kernel_size زوجي أو عكس اتجاه الفلتر.",
      "examNote": "احفظ horizontal median للح harmonic وvertical للح percussive."
    },
    {
      "id": "hpss-implementation",
      "title": "تنفيذ HPSS وlibrosa",
      "original": "النص الأصلي يحسب D=STFT وS=abs(D)، ثم H=medfilt(S,[1,Lh]) وP=medfilt(S,[Lp,1])، ثم masks Mh=H/(H+P+eps)، Mp=P/(H+P+eps)، وبعدها Dh=D*Mh وDp=D*Mp ثم istft. كما يستخدم librosa.decompose.hpss(D) وlibrosa.effects.hpss(y).",
      "simple": "الفصل يتم في spectrogram. نستخدم masks على D المركب للحفاظ على phase ثم نعود إلى الزمن. decompose.hpss يأخذ STFT، أما effects.hpss يأخذ waveform مباشرة.",
      "examples": [
        "eps يمنع القسمة على صفر، Dh/Dp نفس شكل D."
      ],
      "whyImportant": "يجمع فهم النظرية مع استخدام الدوال الجاهزة.",
      "commonMistake": "تطبيق masks على S فقط وفقدان phase، أو تمرير waveform إلى decompose.hpss.",
      "examNote": "اشرح الفرق بين decompose.hpss وeffects.hpss."
    }
  ],
  "detailedExamples": [
    {
      "title": "FFT على complex_wave.wav",
      "problem": "استخراج الترددات المسيطرة.",
      "steps": [
        "تحميل الملف مع sr=None",
        "حساب FFT وbins",
        "استخراج أعلى magnitudes",
        "رسم waveform وspectrum"
      ],
      "result": "duration=5s وresolution=0.20Hz وقمم 120/66/240Hz.",
      "diagramDescription": "الرسم يوضح waveform يساراً وspectrum بقمم واضحة يميناً."
    },
    {
      "title": "Spectrogram للصوت",
      "problem": "رؤية الترددات عبر الزمن.",
      "steps": [
        "احسب STFT",
        "حوّل إلى dB",
        "ارسم specshow بمحاور time/hz"
      ],
      "result": "خريطة زمن-تردد؛ اللون يمثل القوة بالديسيبل.",
      "diagramDescription": "x=time وy=Hz واللون=dB."
    },
    {
      "title": "Window/Hop على chirp",
      "problem": "فهم trade-off.",
      "steps": [
        "جرّب n_fft مختلفة",
        "جرّب hop=512 و128",
        "قارن عدد frames ووضوح التردد"
      ],
      "result": "n_fft الكبير أفضل للتردد، hop الصغير أفضل للزمن.",
      "diagramDescription": "chirp يظهر كخط يتغير مع الزمن."
    },
    {
      "title": "HPSS على ringtone1.wav",
      "problem": "فصل harmonic/percussive.",
      "steps": [
        "احسب STFT",
        "طبق hpss",
        "ارسم الأصل والجزأين",
        "استمع للنتائج"
      ],
      "result": "harmonic يحتفظ بالخطوط الأفقية وpercussive بالضربات العمودية.",
      "diagramDescription": "ثلاث spectrograms: original/harmonic/percussive."
    }
  ],
  "codeExamples": [
    {
      "id": "fft",
      "title": "compute_fft",
      "language": "python",
      "code": "def compute_fft(signal, sample_rate):\n    n_fft = len(signal)\n    fft_result = fft(signal)\n    frequencies = fftfreq(n_fft, 1 / sample_rate)\n    positive_idx = frequencies >= 0\n    frequencies = frequencies[positive_idx]\n    magnitude = np.abs(fft_result[positive_idx])\n    phase = np.angle(fft_result[positive_idx])\n    return frequencies, magnitude, phase",
      "explanation": [
        "n_fft هو عدد العينات.",
        "fft_result قيم مركبة.",
        "fftfreq يحسب bins.",
        "positive_idx يبقي النصف الموجب.",
        "abs يعطي magnitude وangle يعطي phase."
      ],
      "commonMistakes": [
        "رسم fft_result مباشرة.",
        "نسيان sample_rate في fftfreq."
      ],
      "expectedOutput": "frequencies, magnitude, phase",
      "whenToUse": "عند تحليل spectrum لأي إشارة."
    },
    {
      "id": "peaks",
      "title": "find_dominant_frequencies",
      "language": "python",
      "code": "def find_dominant_frequencies(freq, mag, num_peaks=3):\n    peak_indices = np.argsort(mag)[-num_peaks:]\n    dominant_freqs = freq[peak_indices]\n    dominant_mags = mag[peak_indices]\n    sorted_idx = np.argsort(dominant_mags)[::-1]\n    return dominant_freqs[sorted_idx], dominant_mags[sorted_idx]",
      "explanation": [
        "argsort يرتب حسب magnitude.",
        "آخر num_peaks هي الأكبر.",
        "[::-1] يعكس للترتيب التنازلي."
      ],
      "commonMistakes": [
        "استخدام [:num_peaks] بدل [-num_peaks:]."
      ],
      "expectedOutput": "أقوى الترددات وقيمها.",
      "whenToUse": "بعد FFT لاستخراج القمم."
    },
    {
      "id": "stft",
      "title": "compute_stft",
      "language": "python",
      "code": "def compute_stft(audio, n_fft=2048, hop_length=512):\n    stft_results = librosa.stft(audio, n_fft=n_fft, hop_length=hop_length)\n    magnitude = np.abs(stft_results)\n    log_magnitude = librosa.amplitude_to_db(magnitude, ref=np.max)\n    return magnitude, log_magnitude",
      "explanation": [
        "librosa.stft يحسب FFT لكل frame.",
        "abs يحول المركب إلى magnitude.",
        "amplitude_to_db يحسن visualization."
      ],
      "commonMistakes": [
        "استخدام log_magnitude للعودة للصوت."
      ],
      "expectedOutput": "magnitude وlog_magnitude",
      "whenToUse": "لرسم spectrogram."
    },
    {
      "id": "specshow",
      "title": "رسم Spectrogram",
      "language": "python",
      "code": "n_fft = 1024\nhop_length = 256\nmagnitude, log_magnitude = compute_stft(signal, n_fft, hop_length)\nlibrosa.display.specshow(log_magnitude, sr=sr, hop_length=hop_length,\n                         x_axis='time', y_axis='hz')\nplt.colorbar(format='%+2.0f dB')\nplt.show()",
      "explanation": [
        "حدد نفس n_fft/hop المستخدمة.",
        "specshow يضع الزمن والتردد على المحاور.",
        "colorbar يوضح dB."
      ],
      "commonMistakes": [
        "رسم hop_length مختلف عن الحساب."
      ],
      "expectedOutput": "Log spectrogram.",
      "whenToUse": "عندما تحتاج time-frequency visualization."
    },
    {
      "id": "hpss",
      "title": "HPSS يدوي",
      "language": "python",
      "code": "def hpss(signal, n_fft=2048, hop_length=512, kernel_size=31):\n    D = librosa.stft(signal, n_fft=n_fft, hop_length=hop_length)\n    S = np.abs(D)\n    H = medfilt(S, kernel_size=[1, kernel_size])\n    P = medfilt(S, kernel_size=[kernel_size, 1])\n    eps = 1e-9\n    Mh = H / (H + P + eps)\n    Mp = P / (H + P + eps)\n    Yh = librosa.istft(D * Mh, hop_length=hop_length, length=len(signal))\n    Yp = librosa.istft(D * Mp, hop_length=hop_length, length=len(signal))\n    return Yh, Yp",
      "explanation": [
        "D هو STFT المركب.",
        "H median أفقي وP median عمودي.",
        "masks تفصل الطاقة.",
        "نضرب في D للحفاظ على phase.",
        "istft يرجع waveform."
      ],
      "commonMistakes": [
        "فقدان phase.",
        "نسيان eps.",
        "عكس أبعاد median."
      ],
      "expectedOutput": "Yh harmonic وYp percussive",
      "whenToUse": "لفهم HPSS أو تطبيقه يدوياً."
    },
    {
      "id": "librosa-hpss",
      "title": "HPSS بدوال librosa",
      "language": "python",
      "code": "D = librosa.stft(audio2)\nDh, Dp = librosa.decompose.hpss(D, kernel_size=31)\nYh = librosa.istft(Dh, length=len(audio2))\nYp = librosa.istft(Dp, length=len(audio2))\nYh2, Yp2 = librosa.effects.hpss(audio2)",
      "explanation": [
        "decompose.hpss يأخذ STFT.",
        "istft يحول Dh/Dp إلى صوت.",
        "effects.hpss يعمل مباشرة على waveform."
      ],
      "commonMistakes": [
        "تمرير waveform إلى decompose.hpss."
      ],
      "expectedOutput": "إشارتان: harmonic وpercussive.",
      "whenToUse": "عندما تريد فصل الصوت بسرعة."
    }
  ],
  "summary": {
    "definitions": [
      "DFT: تحويل من الزمن إلى التردد.",
      "FFT: خوارزمية سريعة لحساب DFT.",
      "STFT: FFT على نوافذ زمنية.",
      "Spectrogram: خريطة زمن-تردد.",
      "HPSS: فصل harmonic/percussive."
    ],
    "rules": [
      "Δf=fs/N.",
      "Nyquist=fs/2.",
      "small n_fft=time better، large n_fft=frequency better.",
      "small hop=more frames.",
      "horizontal=harmonic، vertical=percussive."
    ],
    "formulas": [
      "X[k]=Σx[n]e^{-i2πkn/N}",
      "f_k=kfs/N",
      "window duration=n_fft/sr",
      "hop duration=hop_length/sr"
    ],
    "commonMistakes": [
      "رسم FFT المركب دون abs.",
      "نسيان sr=None عند الحاجة للأصلي.",
      "استخدام log magnitude للـ istft.",
      "تمرير waveform إلى decompose.hpss."
    ],
    "examNotes": [
      "FFT vs STFT مهم.",
      "احفظ Window/Hop trade-off.",
      "اقرأ محاور spectrogram.",
      "افهم masks في HPSS."
    ],
    "comparisons": [
      {
        "left": "FFT",
        "right": "STFT",
        "point": "FFT ترددات عامة؛ STFT ترددات عبر الزمن."
      },
      {
        "left": "Harmonic",
        "right": "Percussive",
        "point": "Harmonic أفقي ومستمر؛ percussive عمودي وعابر."
      },
      {
        "left": "n_fft كبير",
        "right": "n_fft صغير",
        "point": "الكبير أفضل للتردد؛ الصغير أفضل للزمن."
      }
    ]
  },
  "quiz": [
    {
      "question": "ما وظيفة FFT؟",
      "options": [
        "تصنيف الصوت",
        "تحويل الزمن إلى تردد بكفاءة",
        "رسم waveform فقط",
        "ضغط الملف"
      ],
      "answerIndex": 1,
      "explanation": "FFT تحسب DFT بكفاءة."
    },
    {
      "question": "Δf تساوي:",
      "options": [
        "N/fs",
        "fs/N",
        "fs* N",
        "fs/2"
      ],
      "answerIndex": 1,
      "explanation": "frequency resolution = fs/N."
    },
    {
      "question": "Nyquist frequency هي:",
      "options": [
        "fs",
        "2fs",
        "fs/2",
        "N/2"
      ],
      "answerIndex": 2,
      "explanation": "أعلى تردد قابل للتمثيل هو نصف sample rate."
    },
    {
      "question": "لماذا نستخدم abs مع FFT؟",
      "options": [
        "للحصول على magnitude",
        "لتغيير sample rate",
        "لحذف الزمن",
        "لزيادة frames"
      ],
      "answerIndex": 0,
      "explanation": "ناتج FFT مركب."
    },
    {
      "question": "STFT تضيف على FFT:",
      "options": [
        "معلومات الزمن",
        "labels",
        "ضغط CSV",
        "تغيير classes"
      ],
      "answerIndex": 0,
      "explanation": "STFT تحسب FFT على frames زمنية."
    },
    {
      "question": "شكل STFT في librosa:",
      "options": [
        "(samples,classes)",
        "(1+n_fft//2,n_frames)",
        "(n_frames,n_labels)",
        "(sr,N)"
      ],
      "answerIndex": 1,
      "explanation": "الصفوف bins والأعمدة frames."
    },
    {
      "question": "n_fft كبير يعني غالباً:",
      "options": [
        "زمن أفضل",
        "تردد أفضل وزمن أسوأ",
        "حذف phase",
        "frames أقل دائماً فقط"
      ],
      "answerIndex": 1,
      "explanation": "نافذة أطول تحسن frequency resolution."
    },
    {
      "question": "hop_length صغير يعني:",
      "options": [
        "frames أكثر",
        "bins أقل",
        "sample rate أعلى",
        "لا فرق"
      ],
      "answerIndex": 0,
      "explanation": "hop أصغر ينتج أعمدة زمنية أكثر."
    },
    {
      "question": "البنى الأفقية في HPSS غالباً:",
      "options": [
        "percussive",
        "harmonic",
        "noise فقط",
        "silence"
      ],
      "answerIndex": 1,
      "explanation": "harmonic مستمر على ترددات."
    },
    {
      "question": "librosa.decompose.hpss يأخذ:",
      "options": [
        "waveform فقط",
        "STFT matrix",
        "CSV",
        "classID"
      ],
      "answerIndex": 1,
      "explanation": "decompose يعمل على D=STFT."
    },
    {
      "question": "eps في masks يستخدم لـ:",
      "options": [
        "تجنب القسمة على صفر",
        "زيادة اللون",
        "حذف harmonic",
        "تغيير sr"
      ],
      "answerIndex": 0,
      "explanation": "يحمي المقام H+P."
    },
    {
      "question": "log spectrogram مفيد لأنه:",
      "options": [
        "يضغط المجال الديناميكي",
        "يغير labels",
        "يلغي STFT",
        "يحوّل الصوت إلى نص"
      ],
      "answerIndex": 0,
      "explanation": "dB يجعل التفاصيل مرئية."
    }
  ],
  "examQuestions": [
    {
      "type": "قارن",
      "question": "قارن FFT وSTFT.",
      "modelAnswer": "FFT يعطي spectrum عام للصوت كله ولا يحدد وقت ظهور الترددات. STFT تحسب FFT على نوافذ قصيرة فتنتج time-frequency representation."
    },
    {
      "type": "حساب",
      "question": "احسب Δf إذا fs=22050 وN=110250.",
      "modelAnswer": "Δf=fs/N=0.20Hz."
    },
    {
      "type": "شرح",
      "question": "لماذا نحتفظ بالترددات الموجبة فقط؟",
      "modelAnswer": "لأن FFT لإشارة real-valued متماثل بين الموجب والسالب، فالنصف الموجب يكفي غالباً."
    },
    {
      "type": "شرح",
      "question": "اشرح تأثير n_fft.",
      "modelAnswer": "n_fft صغير يحسن time resolution ويضعف frequency resolution، والكبير يفعل العكس."
    },
    {
      "type": "شرح",
      "question": "لماذا hop_length صغير يزيد الحساب؟",
      "modelAnswer": "لأنه يزيد overlap وعدد frames في spectrogram."
    },
    {
      "type": "قارن",
      "question": "قارن harmonic وpercussive.",
      "modelAnswer": "harmonic مستمر ونغمي وأفقي في spectrogram؛ percussive قصير وعريض ترددياً وعمودي."
    },
    {
      "type": "كود",
      "question": "لماذا نضرب masks في D وليس S فقط؟",
      "modelAnswer": "لأن D يحتوي phase، وiSTFT يحتاج المركب لإعادة بناء waveform."
    },
    {
      "type": "Output",
      "question": "ما output librosa.effects.hpss(y)?",
      "modelAnswer": "يرجع إشارتين زمنيتين: harmonic وpercussive."
    }
  ],
  "practicalExercises": [
    "تمرين إضافي من إعداد الذكاء الاصطناعي: احسب أعلى 5 ترددات لملف wav جديد.",
    "تمرين إضافي من إعداد الذكاء الاصطناعي: قارن spectrogram عند n_fft=512 و4096.",
    "تمرين إضافي من إعداد الذكاء الاصطناعي: طبّق HPSS واسمع Yh وYp.",
    "تمرين إضافي من إعداد الذكاء الاصطناعي: اشرح log spectrogram في 5 أسطر."
  ],
  "cheatSheet": {
    "mostImportant": [
      "FFT يكشف الترددات المسيطرة.",
      "STFT ضروري للصوت المتغير زمنياً.",
      "Spectrogram: x زمن، y تردد، اللون قوة.",
      "HPSS يعتمد على horizontal/vertical structures."
    ],
    "keywords": [
      "FFT",
      "DFT",
      "Nyquist",
      "STFT",
      "Spectrogram",
      "n_fft",
      "hop_length",
      "HPSS",
      "Median filter"
    ],
    "miniExamples": [
      "sr=44100 ⇒ Nyquist=22050Hz.",
      "n_fft=1024 وsr=44100 ⇒ Δf≈43.07Hz.",
      "H=medfilt(S,[1,Lh]) للح harmonic."
    ],
    "warnings": [
      "لا تخلط بين magnitude وfrequency.",
      "لا تفقد phase عند iSTFT.",
      "لا تعتبر n_fft الأكبر أفضل دائماً."
    ],
    "likelyExam": [
      "حساب Δf/Nyquist",
      "FFT vs STFT",
      "Window/Hop effects",
      "قراءة spectrogram",
      "HPSS masks"
    ]
  }
},
  {
  "id": "lab-5-6-features-classification",
  "number": 3,
  "title": "Lab 5+6: Audio Feature Extraction and Audio Classification",
  "sourceStatus": "sample-from-uploaded-notebook",
  "sourceNote": "صفحة نموذجية مبنية على Notebook: Lab 5+6 Audio Feature Extruction and Audio Classification.ipynb. راجع الملف الأصلي دائماً قبل الامتحان.",
  "topics": [
    "UrbanSound8K",
    "Feature Extraction",
    "RMS",
    "ZCR",
    "Spectral Features",
    "MFCC",
    "Random Forest",
    "SVM",
    "KNN",
    "GridSearchCV"
  ],
  "difficulty": "متوسط إلى صعب",
  "estimatedTime": "4-5 ساعات",
  "objectives": [
    "فهم metadata وclassID.",
    "بناء feature extraction function.",
    "إنشاء audio_features.csv.",
    "تدريب RF/SVM/KNN.",
    "تقييم النماذج وضبط hyperparameters."
  ],
  "prerequisites": [
    "pandas basics.",
    "librosa basics.",
    "train/test split.",
    "مبادئ classification."
  ],
  "keyTerms": [
    "metadata",
    "fold",
    "classID",
    "RMS",
    "ZCR",
    "MFCC",
    "StandardScaler",
    "GridSearchCV"
  ],
  "outcomes": [
    "تبني DataFrame من ملفات صوت.",
    "تشرح كل feature.",
    "تتجنب data leakage.",
    "تقرأ accuracy/report/confusion matrix."
  ],
  "sections": [
    {
      "id": "pipeline",
      "title": "خريطة Lab 5+6",
      "original": "النص الأصلي يرتب اللاب: UrbanSound8K Exploration، Feature Extraction Function، Feature Dataset Construction، Saving CSV، Train/Test Split، Random Forest، SVM/KNN، GridSearchCV.",
      "simple": "اللاب يبني pipeline كامل: metadata → audio path → features → DataFrame → split → model → evaluation → tuning.",
      "examples": [
        "الـ model لا يأخذ waveform الخام هنا؛ يأخذ 36 feature."
      ],
      "whyImportant": "هذا أقرب لأسئلة الامتحان العملية.",
      "commonMistake": "القفز للتدريب بدون فهم features.",
      "examNote": "احفظ ترتيب pipeline."
    },
    {
      "id": "metadata",
      "title": "UrbanSound8K metadata",
      "original": "النص الأصلي يقرأ UrbanSound8K.csv. الأعمدة: slice_file_name, fsID, start, end, salience, fold, classID, class. info يعرض 8732 صفاً و8 أعمدة بلا null.",
      "simple": "metadata يخبرنا أين الملف وما label الخاص به. fold للمجلد، slice_file_name للملف، classID للهدف الرقمي.",
      "examples": [
        "path = ../Dataset/fold{fold}/{slice_file_name}."
      ],
      "whyImportant": "بدون metadata لا نستطيع ربط الصوت بالlabel.",
      "commonMistake": "استخدام class النصي بدل classID دون تجهيز.",
      "examNote": "8732 rows و8 columns قيمة output مهمة."
    },
    {
      "id": "feature-function",
      "title": "دالة extruct_audio_features",
      "original": "النص الأصلي يعرف extruct_audio_features(audio_file_path, sr=22050, frame_length=2048, hop_length=512, n_mfcc=13) ويعيد dictionary فيه RMS/ZCR/spectral/MFCC statistics.",
      "simple": "الدالة تحول ملف صوت إلى row ثابت الطول. mean/std يلخصان feature عبر الزمن.",
      "examples": [
        "اسم الدالة في الملف extruct وليس extract."
      ],
      "whyImportant": "قلب اللاب كله.",
      "commonMistake": "تغيير اسم الدالة في مكان دون الآخر.",
      "examNote": "اشرح لماذا نستخدم mean/std."
    },
    {
      "id": "short-audio",
      "title": "معالجة الملفات القصيرة",
      "original": "النص الأصلي إذا len(audio)<frame_length يجعل frame_length=len(audio) وhop_length=frame_length//4.",
      "simple": "هذا يمنع frame أكبر من الصوت، ويحمي loop الطويل من الفشل.",
      "examples": [
        "مفيد عند ملفات قصيرة جداً."
      ],
      "whyImportant": "يجعل feature extraction robust.",
      "commonMistake": "نسيان هذه الحالة قد يوقف بناء dataset.",
      "examNote": "لماذا الشرط موجود؟ سؤال محتمل."
    },
    {
      "id": "rms-zcr",
      "title": "RMS وZCR",
      "original": "النص الأصلي يحسب rms_mean/std وzcr_mean/std.",
      "simple": "RMS يقيس الطاقة/العلو. ZCR يقيس عبور الصفر ويفيد في التمييز بين الأصوات النويزية والحادة.",
      "examples": [
        "clap/noise قد يكون ZCR أعلى."
      ],
      "whyImportant": "ميزات بسيطة لكنها مفيدة.",
      "commonMistake": "اعتبار RMS تردداً.",
      "examNote": "RMS=energy، ZCR=zero crossings."
    },
    {
      "id": "spectral",
      "title": "Spectral Features",
      "original": "النص الأصلي يحسب spectral_centroid وspectral_rolloff وspectral_bandwidth مع mean/std.",
      "simple": "centroid مركز الطاقة، rolloff حد تراكمي للطاقة، bandwidth انتشار الطيف.",
      "examples": [
        "صوت حاد centroid أعلى."
      ],
      "whyImportant": "تصف شكل spectrum للصوت.",
      "commonMistake": "الخلط بين rolloff وbandwidth.",
      "examNote": "قارن التعاريف الثلاثة."
    },
    {
      "id": "mfcc",
      "title": "MFCC",
      "original": "النص الأصلي يحسب 13 MFCC، ثم mfcc_i_mean وmfcc_i_std لكل coefficient.",
      "simple": "MFCCs تلخص شكل الطيف بطريقة قريبة من السمع البشري. 13 معامل × mean/std = 26 feature.",
      "examples": [
        "mfcc_4_mean ظهر كأهم feature في RF."
      ],
      "whyImportant": "من أهم features للتصنيف.",
      "commonMistake": "اعتبار MFCC عموداً واحداً فقط.",
      "examNote": "احسب عدد features من n_mfcc."
    },
    {
      "id": "dataset",
      "title": "بناء Feature Dataset",
      "original": "النص الأصلي يمر على metadata.iterrows مع tqdm، يبني audio_path من fold والاسم، يستخرج features، يضيف classID، ثم df=pd.DataFrame(features_list). output: 8732/8732 خلال 09:11 تقريباً وdf من 37 columns.",
      "simple": "كل ملف صوت يصبح dictionary، وكل dictionary يصبح صفاً. 36 features + classID = 37 columns.",
      "examples": [
        "X لاحقاً يحذف classID ويبقى 36."
      ],
      "whyImportant": "تحويل الصوت إلى tabular dataset.",
      "commonMistake": "نسيان إضافة classID أو خطأ في المسار.",
      "examNote": "ما X وما y؟"
    },
    {
      "id": "save-split",
      "title": "Saving وTrain/Test Split",
      "original": "النص الأصلي يحفظ df.to_csv(audio_features.csv)، ثم X=df.drop(classID) وy=df[classID]، وtrain_test_split(test_size=0.2, random_state=42). output: X_train=(6985,36)، X_test=(1747,36).",
      "simple": "نحفظ لأن استخراج features مكلف. التقسيم يمنع تقييم النموذج على بيانات التدريب نفسها.",
      "examples": [
        "6985+1747=8732."
      ],
      "whyImportant": "أساس تقييم عادل.",
      "commonMistake": "إبقاء classID داخل X أو التقييم على train.",
      "examNote": "احفظ shapes المطبوعة."
    },
    {
      "id": "rf",
      "title": "Random Forest والتقييم",
      "original": "النص الأصلي يستخدم RandomForestClassifier(n_estimators=200, random_state=42). accuracy=0.8861 (88.61%)، ويطبع classification_report وconfusion_matrix.",
      "simple": "Random Forest يجمع عدة decision trees. التقرير يعطي precision/recall/f1، والمصفوفة تكشف أين يخطئ النموذج.",
      "examples": [
        "القطر الرئيسي في confusion matrix = الصحيح."
      ],
      "whyImportant": "baseline قوي وسهل التفسير.",
      "commonMistake": "الاكتفاء بالaccuracy فقط.",
      "examNote": "تعرف معنى precision/recall/f1."
    },
    {
      "id": "importance",
      "title": "Feature Importance",
      "original": "النص الأصلي يعرض top10 feature_importances_: mfcc_4_mean، zcr_mean، mfcc_1_std، mfcc_4_std، mfcc_13_std، spectral_rolloff_mean، mfcc_3_std، spectral_centroid_mean، mfcc_7_mean، rms_mean.",
      "simple": "importance يوضح أي features اعتمد عليها Random Forest أكثر. ظهور MFCC وZCR وspectral features يؤكد أهميتها.",
      "examples": [
        "mfcc_4_mean كانت الأعلى تقريباً."
      ],
      "whyImportant": "يفسر النموذج ويحدد features المؤثرة.",
      "commonMistake": "اعتبار importance سبباً علمياً مطلقاً.",
      "examNote": "قد يُطلب ذكر examples من top features."
    },
    {
      "id": "svm-knn",
      "title": "SVM وKNN مع StandardScaler",
      "original": "النص الأصلي يطبق StandardScaler ثم SVC(kernel=rbf) وKNeighborsClassifier(n_neighbors=7). النتائج: SVM=85.58% وKNN=86.66%.",
      "simple": "SVM/KNN حساسان للمقاييس، لذلك نعمل fit_transform على train وtransform على test فقط.",
      "examples": [
        "Feature كبيرة المقياس قد تسيطر على KNN."
      ],
      "whyImportant": "يمنع model غير عادل بسبب اختلاف scales.",
      "commonMistake": "fit_transform على test يسبب خطأ منهجي.",
      "examNote": "اشرح fit_transform vs transform."
    },
    {
      "id": "grid",
      "title": "GridSearchCV",
      "original": "النص الأصلي يجرب KNN n_neighbors من 1 إلى 20 مع cv=3. أفضل K=1، best score=0.9205، test accuracy=0.9325. ويجرب RF n_estimators=[50,100,200,300] وmax_depth=[None,10,20,30]؛ best params: max_depth=None,n_estimators=200، test=0.8861.",
      "simple": "GridSearch يجرب hyperparameters على train عبر cross-validation ثم نقيم أفضل نموذج على test.",
      "examples": [
        "KNN tuned تحسن إلى 93.25%."
      ],
      "whyImportant": "يبين قوة tuning المنظم.",
      "commonMistake": "اعتبار best_score_ هو test accuracy.",
      "examNote": "فرق validation داخل GridSearch عن test النهائي مهم."
    }
  ],
  "detailedExamples": [
    {
      "title": "استكشاف metadata",
      "problem": "فهم البيانات قبل التدريب.",
      "steps": [
        "اقرأ CSV",
        "اعرض head/info",
        "ارسم توزيع classes"
      ],
      "result": "8732 صفاً و8 أعمدة، وlabels موجودة في classID.",
      "diagramDescription": "bar plot لتوزيع classes."
    },
    {
      "title": "استخراج features",
      "problem": "تحويل ملف صوت إلى vector.",
      "steps": [
        "load audio",
        "RMS/ZCR/spectral/MFCC",
        "mean/std",
        "return dictionary"
      ],
      "result": "كل ملف يصبح 36 feature.",
      "diagramDescription": "audio → features → row."
    },
    {
      "title": "بناء DataFrame",
      "problem": "تحويل كل الملفات إلى dataset.",
      "steps": [
        "loop على metadata",
        "path من fold/name",
        "أضف classID",
        "pd.DataFrame"
      ],
      "result": "df من 37 عموداً مع label.",
      "diagramDescription": "features table."
    },
    {
      "title": "Random Forest",
      "problem": "تدريب baseline.",
      "steps": [
        "split X/y",
        "fit RF",
        "predict",
        "classification_report/confusion_matrix"
      ],
      "result": "accuracy≈88.61%.",
      "diagramDescription": "confusion matrix قطرها الصحيح."
    },
    {
      "title": "GridSearch KNN",
      "problem": "تحسين K.",
      "steps": [
        "scale train/test",
        "جرب K=1..20",
        "cv=3",
        "قيّم على test"
      ],
      "result": "Best K=1 وaccuracy≈93.25%.",
      "diagramDescription": "جدول/منحنى K مقابل score."
    }
  ],
  "codeExamples": [
    {
      "id": "metadata",
      "title": "قراءة metadata",
      "language": "python",
      "code": "metadata = pd.read_csv('../Dataset/UrbanSound8K.csv')\nmetadata.head()\nmetadata.info()\nmetadata['class'].value_counts().plot(kind='bar')",
      "explanation": [
        "read_csv يقرأ الجدول.",
        "head أمثلة.",
        "info عدد الصفوف/null.",
        "value_counts توزيع الفئات."
      ],
      "commonMistakes": [
        "تجاهل fold عند بناء path."
      ],
      "expectedOutput": "8732 rows و8 columns تقريباً.",
      "whenToUse": "استكشاف dataset."
    },
    {
      "id": "features",
      "title": "دالة feature extraction مختصرة",
      "language": "python",
      "code": "def extruct_audio_features(audio_file_path, sr=22050, frame_length=2048, hop_length=512, n_mfcc=13):\n    features = {}\n    audio, _ = librosa.load(audio_file_path, sr=sr)\n    if len(audio) < frame_length:\n        frame_length = len(audio)\n        hop_length = frame_length // 4\n    rms = librosa.feature.rms(y=audio, frame_length=frame_length, hop_length=hop_length)[0]\n    features['rms_mean'], features['rms_std'] = np.mean(rms), np.std(rms)\n    zcr = librosa.feature.zero_crossing_rate(audio, frame_length=frame_length, hop_length=hop_length)[0]\n    features['zcr_mean'], features['zcr_std'] = np.mean(zcr), np.std(zcr)\n    return features",
      "explanation": [
        "ينشئ dictionary.",
        "يحمل الصوت.",
        "يعالج الصوت القصير.",
        "يحفظ mean/std للـ RMS وZCR."
      ],
      "commonMistakes": [
        "نسيان return.",
        "اسم الدالة extruct في النوتبوك."
      ],
      "expectedOutput": "dictionary features.",
      "whenToUse": "قالب استخراج feature من ملف واحد."
    },
    {
      "id": "mfcc",
      "title": "إضافة spectral وMFCC",
      "language": "python",
      "code": "centroid = librosa.feature.spectral_centroid(y=audio, sr=sr, n_fft=frame_length, hop_length=hop_length)[0]\nrolloff = librosa.feature.spectral_rolloff(y=audio, sr=sr, n_fft=frame_length, hop_length=hop_length)[0]\nbandwidth = librosa.feature.spectral_bandwidth(y=audio, sr=sr, n_fft=frame_length, hop_length=hop_length)[0]\nfeatures['spectral_centroid_mean'], features['spectral_centroid_std'] = np.mean(centroid), np.std(centroid)\nfeatures['spectral_rolloff_mean'], features['spectral_rolloff_std'] = np.mean(rolloff), np.std(rolloff)\nfeatures['spectral_bandwidth_mean'], features['spectral_bandwidth_std'] = np.mean(bandwidth), np.std(bandwidth)\nmfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=n_mfcc, n_fft=frame_length, hop_length=hop_length)\nfor i in range(n_mfcc):\n    features[f'mfcc_{i+1}_mean'] = np.mean(mfccs[i])\n    features[f'mfcc_{i+1}_std'] = np.std(mfccs[i])",
      "explanation": [
        "centroid/rolloff/bandwidth تصف spectrum.",
        "mfccs تعطي n_mfcc معاملات.",
        "كل معامل له mean/std."
      ],
      "commonMistakes": [
        "حساب mean لكل mfccs دفعة واحدة."
      ],
      "expectedOutput": "6 spectral + 26 MFCC features عند n_mfcc=13.",
      "whenToUse": "لإكمال feature vector."
    },
    {
      "id": "dataset",
      "title": "بناء DataFrame",
      "language": "python",
      "code": "features_list = []\nfor _, row in tqdm(metadata.iterrows(), total=len(metadata), desc='audio features extraction'):\n    audio_path = f\"../Dataset/fold{row['fold']}/{row['slice_file_name']}\"\n    features = extruct_audio_features(audio_path)\n    features['classID'] = row['classID']\n    features_list.append(features)\ndf = pd.DataFrame(features_list)",
      "explanation": [
        "loop على كل metadata.",
        "path من fold والاسم.",
        "إضافة classID كlabel.",
        "DataFrame من list of dicts."
      ],
      "commonMistakes": [
        "نسيان classID.",
        "خطأ في مسار fold."
      ],
      "expectedOutput": "8732 صفاً و37 عموداً تقريباً.",
      "whenToUse": "بناء dataset تدريب."
    },
    {
      "id": "split-rf",
      "title": "Split وRandom Forest",
      "language": "python",
      "code": "X = df.drop('classID', axis=1)\ny = df['classID']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nrf_classifier = RandomForestClassifier(n_estimators=200, random_state=42)\nrf_classifier.fit(X_train, y_train)\ny_pred = rf_classifier.predict(X_test)\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.4f}\")\nprint(classification_report(y_test, y_pred))",
      "explanation": [
        "X بدون label.",
        "y هو classID.",
        "split 80/20.",
        "fit ثم predict ثم evaluate."
      ],
      "commonMistakes": [
        "إبقاء classID داخل X.",
        "تقييم على train."
      ],
      "expectedOutput": "Accuracy≈0.8861.",
      "whenToUse": "baseline classifier."
    },
    {
      "id": "scaling-grid",
      "title": "Scaling وGridSearch",
      "language": "python",
      "code": "scaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\nparam_grid = {'n_neighbors': range(1, 21)}\ngrid = GridSearchCV(KNeighborsClassifier(), param_grid, cv=3)\ngrid.fit(X_train_scaled, y_train)\nprint(grid.best_params_)\nprint(accuracy_score(y_test, grid.predict(X_test_scaled)))",
      "explanation": [
        "fit scaler على train.",
        "transform test فقط.",
        "GridSearch يجرب قيم K.",
        "التقييم النهائي على test."
      ],
      "commonMistakes": [
        "fit_transform على test.",
        "اختيار K من test."
      ],
      "expectedOutput": "Best K=1, test accuracy≈0.9325.",
      "whenToUse": "تحسين KNN بطريقة منظمة."
    }
  ],
  "summary": {
    "definitions": [
      "Metadata: جدول أسماء الملفات والlabels.",
      "Feature extraction: تحويل الصوت إلى أرقام.",
      "RMS: طاقة الصوت.",
      "ZCR: عبور الصفر.",
      "MFCC: معاملات طيفية سمعية.",
      "GridSearchCV: بحث hyperparameters مع cross-validation."
    ],
    "rules": [
      "X=df.drop(classID)، y=df[classID].",
      "لا تعمل fit على test.",
      "13 MFCC × mean/std =26.",
      "Total features=36، ومع classID يصبح df=37 columns.",
      "SVM/KNN يحتاجان scaling غالباً."
    ],
    "formulas": [
      "test_size=0.2 ⇒ 80/20 split",
      "features=10 basic/spectral + 26 MFCC = 36",
      "accuracy=correct/total"
    ],
    "commonMistakes": [
      "نسيان fold في path.",
      "إدخال classID ضمن X.",
      "fit_transform على X_test.",
      "اعتبار best_score_ هو test accuracy."
    ],
    "examNotes": [
      "احفظ shapes: (6985,36) و(1747,36).",
      "RF=88.61%.",
      "KNN tuned=93.25%.",
      "اشرح وظيفة كل feature."
    ],
    "comparisons": [
      {
        "left": "RMS",
        "right": "ZCR",
        "point": "RMS للطاقة؛ ZCR لعبور الصفر."
      },
      {
        "left": "RF",
        "right": "KNN/SVM",
        "point": "RF أقل حساسية للscaling؛ KNN/SVM يحتاجان scaling."
      },
      {
        "left": "best_score_",
        "right": "test accuracy",
        "point": "الأول CV على train؛ الثاني تقييم نهائي على test."
      }
    ]
  },
  "quiz": [
    {
      "question": "ما label المستخدم؟",
      "options": [
        "fold",
        "slice_file_name",
        "classID",
        "fsID"
      ],
      "answerIndex": 2,
      "explanation": "classID هو الهدف الرقمي."
    },
    {
      "question": "عدد rows في metadata؟",
      "options": [
        "37",
        "8732",
        "36",
        "6985"
      ],
      "answerIndex": 1,
      "explanation": "info أظهر 8732 صفاً."
    },
    {
      "question": "RMS يقيس:",
      "options": [
        "الطاقة",
        "عدد classes",
        "المسار",
        "K"
      ],
      "answerIndex": 0,
      "explanation": "RMS للطاقة/العلو."
    },
    {
      "question": "ZCR يعني:",
      "options": [
        "عبور الصفر",
        "مركز الطيف",
        "عمق الشجرة",
        "عدد MFCC"
      ],
      "answerIndex": 0,
      "explanation": "Zero Crossing Rate."
    },
    {
      "question": "13 MFCC مع mean/std تعطي:",
      "options": [
        "13",
        "26",
        "36",
        "37"
      ],
      "answerIndex": 1,
      "explanation": "13×2=26."
    },
    {
      "question": "عدد features في X؟",
      "options": [
        "8",
        "36",
        "37",
        "8732"
      ],
      "answerIndex": 1,
      "explanation": "classID ليس ضمن X."
    },
    {
      "question": "لماذا scaling مع KNN/SVM؟",
      "options": [
        "لأنهما حساسان للمقياس",
        "لحذف labels",
        "لتغيير sr",
        "لرسم heatmap"
      ],
      "answerIndex": 0,
      "explanation": "يعتمدان على مسافات/حدود."
    },
    {
      "question": "الصحيح مع scaler هو:",
      "options": [
        "fit_transform train وtransform test",
        "fit_transform test",
        "لا نستخدم scaler",
        "fit على الكل"
      ],
      "answerIndex": 0,
      "explanation": "لتجنب leakage."
    },
    {
      "question": "RF accuracy تقريباً:",
      "options": [
        "50%",
        "70%",
        "88.61%",
        "100%"
      ],
      "answerIndex": 2,
      "explanation": "النوتبوك طبع 0.8861."
    },
    {
      "question": "أفضل K في GridSearch؟",
      "options": [
        "1",
        "7",
        "20",
        "200"
      ],
      "answerIndex": 0,
      "explanation": "Best K Value = 1."
    },
    {
      "question": "KNN tuned test accuracy؟",
      "options": [
        "85.58%",
        "86.66%",
        "93.25%",
        "44%"
      ],
      "answerIndex": 2,
      "explanation": "النوتبوك أعطى 0.9325."
    },
    {
      "question": "best_score_ في GridSearch هو:",
      "options": [
        "CV score على train",
        "test accuracy دائماً",
        "عدد الصفوف",
        "feature importance"
      ],
      "answerIndex": 0,
      "explanation": "best_score_ من cross-validation."
    }
  ],
  "examQuestions": [
    {
      "type": "شرح",
      "question": "اشرح pipeline Lab 5+6.",
      "modelAnswer": "metadata ثم بناء path ثم استخراج features ثم DataFrame ثم حفظ CSV ثم split ثم تدريب models ثم evaluation ثم GridSearchCV."
    },
    {
      "type": "قصير",
      "question": "ما الفرق بين class وclassID؟",
      "modelAnswer": "class اسم نصي للفئة، classID label رقمي للتدريب."
    },
    {
      "type": "حساب",
      "question": "احسب عدد features عند n_mfcc=13.",
      "modelAnswer": "5 أنواع basic/spectral ×2=10، و13 MFCC ×2=26، المجموع 36."
    },
    {
      "type": "شرح",
      "question": "لماذا نستخدم mean/std؟",
      "modelAnswer": "لتحويل feature المتغير عبر الزمن إلى أرقام ثابتة الطول لكل ملف."
    },
    {
      "type": "شرح",
      "question": "لماذا لا ندخل classID في X؟",
      "modelAnswer": "لأنه الإجابة/label؛ إدخاله يسبب leakage."
    },
    {
      "type": "قارن",
      "question": "قارن RF وKNN tuned.",
      "modelAnswer": "RF أعطى حوالي 88.61%، بينما KNN بعد tuning بأفضل K=1 وصل حوالي 93.25%."
    },
    {
      "type": "شرح",
      "question": "ما فائدة confusion matrix؟",
      "modelAnswer": "توضح الفئات الصحيحة والمخطئة وتكشف أين يخلط النموذج بين classes."
    },
    {
      "type": "Output",
      "question": "ما shapes الخاصة بالتقسيم؟",
      "modelAnswer": "X_train=(6985,36) وX_test=(1747,36)."
    }
  ],
  "practicalExercises": [
    "تمرين إضافي من إعداد الذكاء الاصطناعي: أضف chroma_stft_mean/std وجرب RF.",
    "تمرين إضافي من إعداد الذكاء الاصطناعي: جرّب n_mfcc=20 واحسب عدد features.",
    "تمرين إضافي من إعداد الذكاء الاصطناعي: ارسم confusion matrix لـKNN tuned.",
    "تمرين إضافي من إعداد الذكاء الاصطناعي: استخدم GridSearchCV لـSVM على C وgamma."
  ],
  "cheatSheet": {
    "mostImportant": [
      "Pipeline: metadata → features → DataFrame → split → model → evaluate → tune.",
      "X يحتوي 36 features وy هو classID.",
      "StandardScaler fit على train فقط.",
      "KNN بعد tuning كان الأفضل في النوتبوك."
    ],
    "keywords": [
      "UrbanSound8K",
      "classID",
      "RMS",
      "ZCR",
      "Centroid",
      "Rolloff",
      "Bandwidth",
      "MFCC",
      "RandomForest",
      "SVM",
      "KNN",
      "GridSearchCV"
    ],
    "miniExamples": [
      "audio_path='../Dataset/fold{fold}/{file}'",
      "X=df.drop('classID',axis=1)",
      "GridSearchCV(KNeighborsClassifier(), {'n_neighbors': range(1,21)}, cv=3)"
    ],
    "warnings": [
      "لا تضع classID داخل X.",
      "لا تستخدم test لاختيار hyperparameters.",
      "انتبه لاسم extruct_audio_features."
    ],
    "likelyExam": [
      "عدد features",
      "train/test shapes",
      "scaling",
      "classification report/confusion matrix",
      "GridSearch best K"
    ]
  }
}
];
