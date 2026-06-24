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
    id: 'lab-2-3-4-frequency-time-frequency',
    number: 2,
    title: 'Lab 2+3+4: Frequency-Domain and Time-Frequency Domain Processing',
    sourceStatus: 'placeholder-from-uploaded-notebook-outline',
    sourceNote: 'تم إنشاء بطاقة هذه المحاضرة من outline الملف المرفوع. الصق الشرح التفصيلي داخل sections قبل الاعتماد النهائي.',
    topics: [
      'FFT and spectrum analysis',
      'Dominant frequencies',
      'DFT and Nyquist theorem',
      'STFT and spectrograms',
      'Window length and hop length effects',
      'HPSS: harmonic/percussive separation',
      'Median filters',
      'librosa.decompose.hpss and librosa.effects.hpss',
    ],
    difficulty: 'متوسط',
    estimatedTime: '120-160 دقيقة',
    objectives: ['PLACEHOLDER: الصق objectives من المحاضرة الأصلية هنا.'],
    prerequisites: ['Lab 1 concepts: sr, waveform, audio array.', 'أساسيات sine waves و frequency.'],
    keyTerms: ['FFT', 'DFT', 'frequency-domain', 'STFT', 'spectrogram', 'hop_length', 'window length', 'HPSS'],
    outcomes: ['PLACEHOLDER: اكتب ما يجب فهمه بعد إنهاء المحاضرة.'],
    sections: [
      {
        id: 'paste-real-content-here',
        title: 'PLACEHOLDER: الصق شرح FFT/STFT/HPSS هنا حسب ترتيب السلايدات',
        original: 'النص الأصلي يقول: الصق هنا نص أو ملخص النقطة الأصلية من المحاضرة.',
        simple: 'الشرح المبسّط: اكتب الشرح العربي المبسط هنا.',
        examples: ['PLACEHOLDER: أضف الأمثلة الأصلية بالترتيب.'],
        whyImportant: 'لماذا هذا مهم؟ اكتب علاقة الفكرة بالامتحان أو التطبيق.',
        commonMistake: 'خطأ شائع: أضف الأخطاء الشائعة بعد مراجعة المحاضرة.',
        examNote: 'ملاحظة امتحانية: أضف سؤالاً متوقعاً أو صياغة مهمة.',
      },
    ],
    detailedExamples: [],
    codeExamples: [],
    summary: {
      definitions: ['PLACEHOLDER: definitions from original lecture.'],
      rules: [],
      comparisons: [],
      formulas: [],
      commonMistakes: [],
      examNotes: [],
    },
    quiz: [],
    examQuestions: [],
    practicalExercises: [],
    cheatSheet: {
      mostImportant: ['PLACEHOLDER: fill after adding lecture details.'],
      keywords: ['FFT', 'STFT', 'HPSS'],
      miniExamples: [],
      warnings: ['هذه الصفحة placeholder وليست شرحاً نهائياً.'],
      likelyExam: [],
    },
  },
  {
    id: 'lab-5-6-features-classification',
    number: 3,
    title: 'Lab 5+6: Audio Feature Extraction and Audio Classification',
    sourceStatus: 'placeholder-from-uploaded-notebook-outline',
    sourceNote: 'تم إنشاء بطاقة هذه المحاضرة من outline الملف المرفوع. الصق الشرح التفصيلي داخل sections قبل الاعتماد النهائي.',
    topics: [
      'UrbanSound8K exploration',
      'Audio feature extraction function',
      'RMS, zero-crossing rate, spectral features, MFCCs',
      'Feature dataset construction',
      'Train/test split',
      'Random Forest classifier',
      'SVM and KNN classifiers',
      'GridSearchCV hyperparameter tuning',
    ],
    difficulty: 'متوسط إلى صعب',
    estimatedTime: '150-190 دقيقة',
    objectives: ['PLACEHOLDER: الصق objectives من المحاضرة الأصلية هنا.'],
    prerequisites: ['Python basics', 'pandas basics', 'sklearn train/test split and classifiers', 'Lab 1-4 audio concepts'],
    keyTerms: ['UrbanSound8K', 'RMS', 'ZCR', 'MFCC', 'RandomForest', 'SVM', 'KNN', 'GridSearchCV'],
    outcomes: ['PLACEHOLDER: اكتب ما يجب فهمه بعد إنهاء المحاضرة.'],
    sections: [
      {
        id: 'paste-real-content-here',
        title: 'PLACEHOLDER: الصق شرح feature extraction/classification هنا حسب ترتيب السلايدات',
        original: 'النص الأصلي يقول: الصق هنا نص أو ملخص النقطة الأصلية من المحاضرة.',
        simple: 'الشرح المبسّط: اكتب الشرح العربي المبسط هنا.',
        examples: ['PLACEHOLDER: أضف الأمثلة الأصلية بالترتيب.'],
        whyImportant: 'لماذا هذا مهم؟ اكتب علاقة الفكرة بالامتحان أو التطبيق.',
        commonMistake: 'خطأ شائع: أضف الأخطاء الشائعة بعد مراجعة المحاضرة.',
        examNote: 'ملاحظة امتحانية: أضف سؤالاً متوقعاً أو صياغة مهمة.',
      },
    ],
    detailedExamples: [],
    codeExamples: [],
    summary: {
      definitions: ['PLACEHOLDER: definitions from original lecture.'],
      rules: [],
      comparisons: [],
      formulas: [],
      commonMistakes: [],
      examNotes: [],
    },
    quiz: [],
    examQuestions: [],
    practicalExercises: [],
    cheatSheet: {
      mostImportant: ['PLACEHOLDER: fill after adding lecture details.'],
      keywords: ['RMS', 'ZCR', 'MFCC', 'RandomForest', 'SVM', 'KNN'],
      miniExamples: [],
      warnings: ['هذه الصفحة placeholder وليست شرحاً نهائياً.'],
      likelyExam: [],
    },
  },
];
